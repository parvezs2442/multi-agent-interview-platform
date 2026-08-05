import express, { Router } from "express";
import { GoogleAuth, Logout } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", GoogleAuth)
authRouter.post("/logout", Logout)

export default authRouter;