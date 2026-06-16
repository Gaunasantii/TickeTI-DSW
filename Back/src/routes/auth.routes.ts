import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter: Router = Router();

const authController = new AuthController();

authRouter.post("/login", authController.login)