import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import {User} from "../Models/Users/users.model.js";

const registerUser = asyncHandler(async (req, res) => {
    const body = req.body || {};
    const username = String(body.username ?? body.userName ?? body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "").trim();

    
    console.log("email: ",email);
    console.log("username: ",username);
    console.log("password: ",password);
    if(!username || !email || !password){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({$or: [{email}, {username}]});

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        username,
        email,
        password
    });
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken") 

    if(!createdUser){
        throw new ApiError(500, "User registration failed")
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"))
});


const generateTokensAndSendResponse = async(userId) =>{
    try{
      const user = await User.findById(userId);
            if(!user){
                throw new ApiError(404, "User not found")
            }

            const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };

    }catch(error){
                throw new ApiError(500, "Token generation failed")
    }
}

const loginUser = asyncHandler(async (req, res) => {

    const {email, password, username} = req.body


            if(!email && !username){
        throw new ApiError(400, "Email or username is required")
      }

            if(!password){
                throw new ApiError(400, "Password is required")
            }

      const user = await User.findOne({$or: [{email}, {username}]});

      if(!user){
        throw new ApiError(404, "User not found")
      }

      const isPasswordCorrect = await user.isPasswordCorrect(password);

      if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect password")
      }

     const { accessToken, refreshToken } = await generateTokensAndSendResponse(user._id);

        const logedinUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken
        }, { new: true }).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        }

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, logedinUser, "User logged in successfully"))


    
    });

const logoutUser = asyncHandler(async (req, res) => {
    
  await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: "" }
    }, { new: true })

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        path: "/",
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));

});

const getAllUsers = asyncHandler(async (req, res) => {
    const currentUserId = req.user?._id;

    const users = await User.find({ _id: { $ne: currentUserId } })
        .select("_id username email")
        .sort({ username: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getAllUsers };
