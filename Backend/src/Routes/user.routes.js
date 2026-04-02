import  { Router } from "express";
import { registerUser } from "../Controllers/users.controllers.js";

const router = Router();

router.route('/register').post(registerUser)

router.route('/login').post(registerUser)



export default router;