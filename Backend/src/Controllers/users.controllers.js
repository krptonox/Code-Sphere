import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import {User} from "../Models/Users/users.model.js";

const registerUser = asyncHandler(async (req, res) => {
    //  res.status(200).json({
    //     message: "User registered successfully"
    //  })
    //get data from user
    //Validation of data
    //check if user already exists
    //hash password
    //store user in databse
    //create user object - create entry in db
    //remove password and refresh token from response
    //check for user creation success and send response

    //Step 1: Get data from user
    const {username, email, password} = req.body;
    console.log("email: ",email);
    if(!username || !email || !password){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({$or: [{email}, {username}]});

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    //Step 2: Create user object - create entry in db
    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await user.findById(user._id).select("-password -refreshToken") // This line retrieves the created user from the database using their unique identifier (user._id) and excludes the password and refreshToken fields from the result. The select() method is used to specify which fields to include or exclude in the query result. In this case, it excludes the password and refreshToken fields for security reasons, ensuring that sensitive information is not sent back in the response.

    if(!createdUser){
        throw new ApiError(500, "User registration failed")
    }

    //Step 3: Check for user creation success and send response
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"))
});

export { registerUser };
