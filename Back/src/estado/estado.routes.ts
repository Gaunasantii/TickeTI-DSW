import { Router } from "express";
import { estadoController } from "./estado.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEstadoSchema } from "./DTO/CreateEstado.dto.js";
import { FindOneEstadoSchema } from "./DTO/FindOneEstado.dto.js";

export const estadoRouter:Router = Router();

estadoRouter.post('/estados',ValidationMiddleware(CreateEstadoSchema),estadoController.createNew);
estadoRouter.get('/estados',estadoController.findAll)
estadoRouter.get('/estados/:id',ValidationMiddleware(FindOneEstadoSchema),estadoController.findOne)