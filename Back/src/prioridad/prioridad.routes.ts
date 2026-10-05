import { Router } from "express";
export const prioridadrouter:Router = Router();
import { prioridadcontroller } from "./prioridad.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreatePrioridadSchema } from "./DTO/CreatePrioridad.dto.js";
import { ModifyPrioridadSchema } from "./DTO/ModifyPrioridad.dto.js";
import { DeletePrioridadSchema } from "./DTO/DeletePrioridad.dto.js";

prioridadrouter.post("/prioridad",ValidationMiddleware(CreatePrioridadSchema), prioridadcontroller.createPrioridad);
prioridadrouter.get("/prioridad", prioridadcontroller.findAll);
prioridadrouter.put("/prioridad/:id",ValidationMiddleware(ModifyPrioridadSchema), prioridadcontroller.updatePrioridad);
prioridadrouter.delete("/prioridad/:id",ValidationMiddleware(DeletePrioridadSchema), prioridadcontroller.deletePrioridad);
