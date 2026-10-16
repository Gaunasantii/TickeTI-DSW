import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { ChangePasswordSchema } from "./DTO/ChangePassword.dto.js";
import { personacontroller } from "./persona.controller.js";

export const personarouter: Router = Router();

personarouter.put(
  "/persona/cambiar-password",
  authenticateToken,
  ValidationMiddleware(ChangePasswordSchema),
  personacontroller.changePassword
);