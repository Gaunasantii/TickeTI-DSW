import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { LoginInSchema } from "./DTO/LoginIn.dto.js";

export const authRouter: Router = Router();

const authController = new AuthController();

authRouter.post("/login",ValidationMiddleware(LoginInSchema), authController.login)