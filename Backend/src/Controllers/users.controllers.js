import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import {User} from "../Models/Users/users.model.js";

const registerUser = asyncHandler(async (req, res) => {
 
    //get data from user
    //Validation of data
    //check if user already exists
    //hash password
    //store user in databse
    //create user object - create entry in db
    //remove password and refresh token from response
    //check for user creation success and send response

    //Step 1: Get data from user
    // Support JSON, urlencoded and multipart form-data, and tolerate common key variants from clients.
    //  Frontend signup payload (username/email/password) yahan receive hota hai.
    const body = req.body || {};
    const username = String(body.username ?? body.userName ?? body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "").trim();
    // Log the received values for debugging purposes. In production, consider removing or masking sensitive information like passwords.
    
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

    //Step 2: Create user object - create entry in db
    const user = await User.create({
        username,
        email,
        password
    });

    // Query with the model, not the created document instance, to avoid runtime method errors.
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken") // This line retrieves the created user from the database using their unique identifier (user._id) and excludes the password and refreshToken fields from the result. The select() method is used to specify which fields to include or exclude in the query result. In this case, it excludes the password and refreshToken fields for security reasons, ensuring that sensitive information is not sent back in the response.

    if(!createdUser){
        throw new ApiError(500, "User registration failed")
    }

    //  Response me createdUser return kar rahe hain, jisse frontend username read kar sake.
    //Step 3: Check for user creation success and send response
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

    //STEPS TO LOGIN USER
      //req body se data get karo
      //username or email , kisi ek pe login karna chahiye
      //find user in database using email or username
      //password match karo
      //acess token and refresh token generate karo
      //send cookie with refresh token and send access token in response

    //  Login.jsx currently email + password bhej raha hai (username optional rakha hai).
    const {email, password, username} = req.body


      // Validate that either email or username is provided in the request body. If neither is provided, an error is thrown indicating that both fields are required. This validation ensures that the login process has sufficient information to identify the user, allowing them to log in using either their email address or their username, providing flexibility in the login process.
            if(!email && !username){
        throw new ApiError(400, "Email or username is required")
      }

            if(!password){
                throw new ApiError(400, "Password is required")
            }
      
      // Find the user in the database using either email or username. The $or operator allows us to search for a user document that matches either the provided email or username. This is useful for allowing users to log in using either their email address or their username, providing flexibility in the login process.
      const user = await User.findOne({$or: [{email}, {username}]});

      if(!user){
        throw new ApiError(404, "User not found")
      }


      // Compare the provided password with the hashed password stored in the database using the isPasswordCorrect method defined in the user schema. This method uses bcrypt to securely compare the plaintext password with the hashed password. If the passwords do not match, an error is thrown indicating that the password is incorrect.
      const isPasswordCorrect = await user.isPasswordCorrect(password);

      if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect password")
      }

     const { accessToken, refreshToken } = await generateTokensAndSendResponse(user._id);
        // Set the refresh token in an HTTP-only cookie to enhance security by preventing client-side scripts from accessing the token. The cookie is configured with a max age of 7 days (7 * 24 * 60 * 60 * 1000 milliseconds) and is marked as secure, meaning it will only be sent over HTTPS connections. This approach helps protect the refresh token from potential cross-site scripting (XSS) attacks and ensures that it is transmitted securely between the client and server.

        const logedinUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken
        }, { new: true }).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
        }

        // Hinglish note: logedinUser frontend ko milta hai, isi se Feed page ke liye username nikalte hain.
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, logedinUser, "User logged in successfully"))// This line sends a JSON response with a status code of 200 (OK) and includes the logged-in user's information (excluding the password and refresh token) in the response body. The response also includes a success message indicating that the user has logged in successfully. Additionally, the access token and refresh token are set as HTTP-only cookies in the response, allowing the client to store them securely for subsequent authenticated requests.});


    
    });

const logoutUser = asyncHandler(async (req, res) => {
     //STEPS TO LOGOUT USER
    //get refresh token from cookie
    //find user with refresh token in database
    //if user not found then throw error
    //if user found then remove refresh token from database
    //clear cookie from response
    
  await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: "" }
    }, { new: true })

    const options = {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));

});

export { registerUser, loginUser, logoutUser };
