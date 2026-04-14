import  { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/users.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();

// Parse multipart form-data text fields from Postman so req.body is populated.
//  Signup endpoint ko frontend se direct hit karenge from authService.js.
router.route('/register').post(registerUser)

//Login endpoint ko Login.jsx call karta hai.
router.route('/login').post(loginUser)

//secured route 
// Logout future me cookie/token verify karke secure tareeke se chalega.
router.route('/logout').post(verifyJwt, logoutUser)



export default router;