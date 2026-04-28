import asyncHandler  from '../Utils/asyncHandler.js';
import ApiError from '../Utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { User } from '../Models/Users/users.model.js';
const verifyJwt = asyncHandler(async (req,_,next) => {
    try {
        const authorizationHeader = req.get("Authorization") || req.headers.authorization;
        const token = req.cookies?.accessToken || authorizationHeader?.replace("Bearer ", "");
    
        if(!token){
            throw new ApiError(401, "Unauthorized")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(401, "Invalid access token")
    }
})

export {verifyJwt};