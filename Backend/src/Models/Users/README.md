# User Model Documentation

## Overview
This folder contains the User model for the Code-Sphere application. The User model defines the structure and behavior of user documents in the MongoDB database using Mongoose.

## File: `users.model.js`

### Purpose
Defines the User schema and model with authentication-related fields, password hashing, and JWT token generation methods.

---

## Schema Fields

### Basic User Information
- **username** (String) - Unique username, required for user identification
- **email** (String) - Unique email address, required and used for communication and recovery
- **password** (String) - User password, required and secured through hashing

### Authentication & Session Management
- **email_Verified** (Boolean) - Tracks whether the user's email has been verified (default: false)
- **refreshToken** (String) - Stores the refresh token for session management (default: null)
  - **Why?** Allows users to obtain new access tokens without re-logging in
  - **How it works?** On login, a refresh token is generated and stored in the database. This token can be used to request a new access token when the current one expires.

### Automatic Fields (via `timestamps: true`)
- **createdAt** - Automatically set when a user document is created
- **updatedAt** - Automatically updated when a user document is modified

---

## Key Features & Implementations

### 1. Password Hashing (bcryptjs)
```javascript
userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
```
- **What it does:** Automatically hashes the password before saving to the database
- **Why:** Plain-text passwords are a security risk. Hashing ensures passwords are never stored in plain text
- **How:** Uses bcryptjs library with a salt round of 10 for secure hashing
- **When:** Only runs when password is modified (not on every save)

### 2. Password Verification (`isPasswordCorrect`)
```javascript
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
```
- **What it does:** Compares a plain-text password with the hashed password in the database
- **Why:** Needed during login to verify user credentials
- **Returns:** Boolean (true if passwords match, false otherwise)

### 3. Access Token Generation (`generateAccessToken`)
```javascript
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username 
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    })
}
```
- **What it does:** Creates a JWT (JSON Web Token) for user authentication
- **Why:** Allows stateless authentication where the server doesn't need to store session data
- **Duration:** Short-lived (default: 1 day via `ACCESS_TOKEN_EXPIRES_IN`)
- **Payload:** Contains user id, email, and username
- **Usage:** Sent to client after login; client includes it in the `Authorization` header for subsequent requests

### 4. Refresh Token Generation (`generateRefreshToken`)
```javascript
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
}
```
- **What it does:** Creates a long-lived JWT for obtaining new access tokens
- **Why:** Prevents users from having to log in again when their access token expires
- **Duration:** Long-lived (default: 10 days via `REFRESH_TOKEN_EXPIRES_IN`)
- **Usage:** Used by the client to request a new access token before expiration
- **Storage:** Can be stored in the database for server-side token invalidation (e.g., logout)

---

## Dependencies

### Imported Libraries
1. **mongoose** - MongoDB object modeling
   - Used to define schemas and models for database interaction
   
2. **bcryptjs** - Password hashing library
   - Securely hashes passwords before storage
   - Compares passwords during login
   
3. **jsonwebtoken (jwt)** - JWT creation and verification
   - Generates access and refresh tokens for authentication
   - Tokens are validated server-side using the secret key

---

## Environment Variables Required

These variables must be defined in `.env` file:

```
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=10d
```

---

## Model Export

```javascript
export const User = mongoose.model("User", userSchema)
```
- Creates and exports the User model for use throughout the application
- Mongoose automatically maps this to a "users" collection in MongoDB

---

## Authentication Flow Overview

1. **User Signup:**
   - User provides username, email, password
   - Password is hashed automatically before storage
   - User document is created in MongoDB

2. **User Login:**
   - User provides email and password
   - `isPasswordCorrect()` verifies the credential
   - `generateAccessToken()` and `generateRefreshToken()` are called
   - Tokens are sent to client
   - Refresh token is stored in `refreshToken` field (optional but recommended)

3. **User Request:**
   - Client includes access token in request headers
   - Backend verifies token signature
   - Request is processed if token is valid

4. **Token Refresh:**
   - When access token expires, client sends refresh token
   - Backend generates a new access token
   - Client uses new access token for subsequent requests

5. **User Logout:**
   - Refresh token in database is deleted/invalidated
   - Client removes tokens from local storage
   - User is logged out

---

## When to Use This Model

- During user signup/registration
- During user login
- When generating new tokens
- When verifying passwords
- When tracking user creation/update times
- When validating email verification status

---

## Last Updated
April 1, 2026 - Added comprehensive documentation and installed `mongoose-aggregate-paginate-v2` for pagination support.
