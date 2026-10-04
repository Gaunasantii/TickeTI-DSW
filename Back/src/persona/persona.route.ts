import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { PaginatedPersonSchema } from "./DTO/PersonPaginatedQuery.dto.js";
export const personrouter: Router = Router();

import { PersonController } from "./person.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

personrouter.get("/persons/paginate",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(PaginatedPersonSchema),
PersonController.PaginateUserAndTecnicos);