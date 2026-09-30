import { Router } from "express";
export const oficinarouter:Router = Router();
import { oficinacontroller } from "./oficina.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateOficinaSchema } from "./DTO/CreateOficina.dto.ts.js";
import { ModifyOficinaSchema } from "./DTO/ModifyOficina.dto.js";
import { DeleteOficinaSchema } from "./DTO/DeleteOficina.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

oficinarouter.post("/oficinas",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateOficinaSchema), oficinacontroller.createOficina);
oficinarouter.get("/oficinas", authenticateToken,oficinacontroller.findAll);
oficinarouter.put("/oficinas/:id",ValidationMiddleware(ModifyOficinaSchema), oficinacontroller.updateOficina);
oficinarouter.delete("/oficinas/:id",ValidationMiddleware(DeleteOficinaSchema), oficinacontroller.deleteOficina);
