import { Router } from "express";
import { estadoController } from "../controllers/estado.controller.js";

export const estadoRouter:Router = Router();

estadoRouter.post('/estados',estadoController.createNew);
estadoRouter.get('/estados',estadoController.findAll)