import express, { Router } from "express";
import { GoogleAuth, Logout } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", GoogleAuth)
authRouter.get("/logout", Logout)

export default authRouter;