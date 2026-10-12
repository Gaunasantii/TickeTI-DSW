import { Router } from "express";
import { estadoController } from "./estado.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEstadoSchema } from "./DTO/CreateEstado.dto.js";
import { FindOneEstadoSchema } from "./DTO/FindOneEstado.dto.js";
import { PaginateEstadoQuerySchema } from "./DTO/PaginateEstadoQuery.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { UpdateEstadoSchema } from "./DTO/UpdateEstado.dto.js";

export const estadoRouter:Router = Router();

estadoRouter.get('/estados/paginated',authenticateToken,ValidationMiddleware(PaginateEstadoQuerySchema),estadoController.getPaginated);
estadoRouter.post('/estados',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateEstadoSchema),estadoController.createNew);
estadoRouter.get('/estados',authenticateToken,estadoController.findAll)
estadoRouter.get('/estados/:id',authenticateToken,ValidationMiddleware(FindOneEstadoSchema),estadoController.findOne)
estadoRouter.delete('/estados/:id',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(FindOneEstadoSchema),estadoController.delete)
estadoRouter.put('/estados/:id',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(UpdateEstadoSchema),estadoController.update);
