import { Router } from "express";
import { estadoController } from "./estado.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEstadoSchema } from "./DTO/CreateEstado.dto.js";
import { FindOneEstadoSchema } from "./DTO/FindOneEstado.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

export const estadoRouter:Router = Router();

estadoRouter.post('/estados',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateEstadoSchema),estadoController.createNew);
estadoRouter.get('/estados',authenticateToken,estadoController.findAll)
estadoRouter.get('/estados/:id',authenticateToken,ValidationMiddleware(FindOneEstadoSchema),estadoController.findOne)