import { Router } from "express";
import { asignacioncontroller } from "./asignacion.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateAsignacionSchema } from "./DTO/CreateAsignacion.dto.js";
import { ChangeStateAsignacionSchema } from "./DTO/ChangeStateAsignacion.dto.js";
import { DeleteAsignacionSchema } from "./DTO/DeleteAsignacion.js";

export const asignacionrouter:Router = Router();

asignacionrouter.get('/asignaciones',asignacioncontroller.findAll);
asignacionrouter.post('/asignaciones',ValidationMiddleware(CreateAsignacionSchema),asignacioncontroller.createAsignacion);
asignacionrouter.put('/asignaciones/:id',ValidationMiddleware(ChangeStateAsignacionSchema),asignacioncontroller.ChangeStateAsignacion);
asignacionrouter.delete('/asignaciones/:id',ValidationMiddleware(DeleteAsignacionSchema),asignacioncontroller.deleteAsignacion);