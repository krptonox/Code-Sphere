import  { Router } from "express";
import multer from "multer";
import { loginUser, logoutUser, registerUser } from "../Controllers/users.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();
const upload = multer();

// Parse multipart form-data text fields from Postman so req.body is populated.
router.route('/register').post(upload.none(), registerUser)

router.route('/login').post(loginUser)

//secured route 
router.route('/logout').post(verifyJwt, logoutUser)



export default router;