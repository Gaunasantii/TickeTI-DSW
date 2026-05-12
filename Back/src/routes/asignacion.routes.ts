import { Router } from "express";
import { asignacioncontroller } from "../controllers/asignacion.controller.js";

export const asignacionrouter:Router = Router();

asignacionrouter.get('/asignaciones',asignacioncontroller.findAll);
asignacionrouter.post('/asignaciones',asignacioncontroller.createAsignacion);
asignacionrouter.put('/asignaciones/:id',asignacioncontroller.updateAsignacion);
asignacionrouter.delete('/asignaciones/:id',asignacioncontroller.deleteAsignacion);