import express from "express";
import authRequiredMiddleware from "../middlewares/authentication";
import { signIn, signUp } from "../controllers/authentication.controller";

export const authRouter = express.Router();

//add middlewares
authRouter.use(express.json());
//SignIn
authRouter.post("/signin", signIn);

//SignUp
authRouter.post("/signup", signUp);
