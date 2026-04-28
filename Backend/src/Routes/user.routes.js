import  { Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../Controllers/users.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(verifyJwt, logoutUser)

router.route('/all').get(verifyJwt, getAllUsers)

export default router;