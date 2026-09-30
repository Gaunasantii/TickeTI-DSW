import { Router } from "express";
import { asignacioncontroller } from "./asignacion.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateAsignacionSchema } from "./DTO/CreateAsignacion.dto.js";
import { ChangeStateAsignacionSchema } from "./DTO/ChangeStateAsignacion.dto.js";
import { DeleteAsignacionSchema } from "./DTO/DeleteAsignacion.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

export const asignacionrouter:Router = Router();

asignacionrouter.get('/asignaciones',authenticateToken,asignacioncontroller.findAll);
asignacionrouter.post('/asignaciones',authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(CreateAsignacionSchema),asignacioncontroller.createAsignacion);
asignacionrouter.put('/asignaciones/:id',ValidationMiddleware(ChangeStateAsignacionSchema),asignacioncontroller.ChangeStateAsignacion);
asignacionrouter.delete('/asignaciones/:id',ValidationMiddleware(DeleteAsignacionSchema),asignacioncontroller.deleteAsignacion);