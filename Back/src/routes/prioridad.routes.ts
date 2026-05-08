import { Router } from "express";
export const prioridadrouter = Router();
import { prioridadcontroller } from "../controllers/prioridad.controller.js";

prioridadrouter.post("/prioridad", prioridadcontroller.createPrioridad);
prioridadrouter.get("/prioridad", prioridadcontroller.findAll);
prioridadrouter.put("/prioridad/:id", prioridadcontroller.updatePrioridad);
prioridadrouter.delete("/prioridad/:id", prioridadcontroller.deletePrioridad);
