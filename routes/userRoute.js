
import { Router } from "express";
import { loginUser, registerUser } from "../controller/userController.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/user-login",loginUser)

  
