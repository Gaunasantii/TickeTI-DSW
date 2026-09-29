import { Router } from "express";
export const prioridadrouter:Router = Router();
import { prioridadcontroller } from "./prioridad.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreatePrioridadSchema } from "./DTO/CreatePrioridad.dto.js";
import { ModifyPrioridadSchema } from "./DTO/ModifyPrioridad.dto.js";
import { DeletePrioridadSchema } from "./DTO/DeletePrioridad.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

prioridadrouter.post("/prioridad",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreatePrioridadSchema), prioridadcontroller.createPrioridad);
prioridadrouter.get("/prioridad", prioridadcontroller.findAll);
prioridadrouter.put("/prioridad/:id",ValidationMiddleware(ModifyPrioridadSchema), prioridadcontroller.updatePrioridad);
prioridadrouter.delete("/prioridad/:id",ValidationMiddleware(DeletePrioridadSchema), prioridadcontroller.deletePrioridad);
