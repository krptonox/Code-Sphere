import mongoose from "mongoose";  // Importing the mongoose library to define the schema and model for the User collection in MongoDB.

import bcrypt from "bcryptjs";  // Importing the bcryptjs library to handle password hashing for user authentication. This library provides functions to hash passwords securely and compare hashed passwords during login.


import jwt from "jsonwebtoken";  // Importing the jsonwebtoken library to handle JSON Web Tokens (JWT) for user authentication. This library allows us to create and verify JWTs, which can be used to securely transmit information between parties and manage user sessions in a stateless manner.


const userSchema = new mongoose.Schema({  // Defining the schema for the User collection.
    // id: {type: Number , required: true},  // The 'id' field is of type Number and is required.

    username: {type: String, required:true, unique:true}, // The 'username' field is of type String and is required.

    email: {type: String, required:true, unique:true}, // The 'email' field is of type String and is required.

    password: {type: String, required:true}, // The 'password' field is of type String and is required.

    email_Verified: {type: Boolean, default:false}, // The 'email_verified' field is of type Boolean and has a default value of false, indicating whether the user's email has been verified or not.
    
    refreshToken: {type: String, default: null}, // The 'refreshToken' field stores the user's refresh token for session management. It is used to generate new access tokens without requiring the user to log in again. It is set to null by default and updated when the user logs in.
    
    // created_At: {type: Date, default: Date.now} // The 'created_at' field is of type Date and has a default value of the current date and time when a new user document is created. This field can be used to track when each user was registered in the system.

},{
    timestamps:true // This option adds two fields to the schema: 'createdAt' and 'updatedAt'. These fields will automatically be managed by Mongoose, where 'createdAt' will store the date and time when a document is created, and 'updatedAt' will store the date and time when a document is last updated. This is useful for tracking the creation and modification times of user documents in the database.
})


userSchema.pre("save", async function() {
  if(!this.isModified("password")) return; // Skip re-hashing when password is unchanged.
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) // This method compares the provided password with the hashed password stored in the database. It returns a boolean value indicating whether the passwords match or not.
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
}// This method generates a JSON Web Token (JWT) for the user. It takes the user's id, email, and username as payload and signs it using a secret key defined in the environment variable ACCESS_TOKEN_SECRET. The token also has an expiration time defined in ACCESS_TOKEN_EXPIRES_IN. This token can be used for authenticating the user in subsequent requests.

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        id:this._id,
        email:this.email,
        username:this.username 
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      } 
    )
}// This method generates a refresh token for the user. Similar to the access token, it takes the user's id, email, and username as payload and signs it using a secret key defined in the environment variable REFRESH_TOKEN_SECRET. The refresh token has a longer expiration time defined in REFRESH_TOKEN_EXPIRES_IN. Refresh tokens are typically used to obtain new access tokens without requiring the user to log in again.



export const User = mongoose.model("User",    userSchema) // Creating a model named "User" using the defined schema and exporting it for use in other parts of the application.


 


//why const user , not directly export UserSchema ?
// We define the userSchema first to create a structured representation of the User data. Then, we create a model named "User" using mongoose.model() which takes the name of the collection ("User") and the schema (userSchema) as arguments. This model provides an interface to interact with the User collection in MongoDB, allowing us to perform operations like creating, reading, updating, and deleting user documents. By exporting the User model, we can use it in other parts of our application to manage user data effectively.

//what is model in mongoose ?
// In Mongoose, a model is a constructor function that represents a specific collection in the MongoDB database. It is created using the mongoose.model() method, which takes two arguments: the name of the collection (as a string) and the schema that defines the structure of the documents in that collection. The model provides an interface for interacting with the database, allowing you to perform operations such as creating, reading, updating, and deleting documents in the collection. It also includes built-in methods for querying the database and validating data based on the defined schema.