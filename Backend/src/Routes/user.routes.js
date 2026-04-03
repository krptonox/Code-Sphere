import  { Router } from "express";
import multer from "multer";
import { registerUser } from "../Controllers/users.controllers.js";

const router = Router();
const upload = multer();

// Parse multipart form-data text fields from Postman so req.body is populated.
router.route('/register').post(upload.none(), registerUser)

router.route('/login').post(upload.none(), registerUser)



export default router;