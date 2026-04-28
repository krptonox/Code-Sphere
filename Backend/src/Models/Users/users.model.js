import mongoose from "mongoose";  

import jwt from "jsonwebtoken";  
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({  
    // id: {type: Number , required: true},  // The 'id' field is of type Number and is required.

    username: {type: String, required:true, unique:true}, 

    email: {type: String, required:true, unique:true}, 

    password: {type: String, required:true}, 

    email_Verified: {type: Boolean, default:false}, 
    
    refreshToken: {type: String, default: null}, 
    
},{
    timestamps:true 
})


userSchema.pre("save", async function() {
  if(!this.isModified("password")) return; 
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        id:this._id,
        email:this.email,
        username:this.username 
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      } 
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        id:this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      } 
    )
}


export const User = mongoose.model("User",    userSchema) 

 
