import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { PaginatedPersonSchema } from "./DTO/PersonPaginatedQuery.dto.js";
import { ChangePasswordSchema } from "./DTO/ChangePassword.dto.js";
export const personrouter: Router = Router();

import { PersonController } from "./person.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

personrouter.get("/persons/paginate",authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(PaginatedPersonSchema),
PersonController.PaginateUserAndTecnicos);
personrouter.put("/persona/cambiar-password", authenticateToken, ValidationMiddleware(ChangePasswordSchema), PersonController.changePassword);