import { Router } from "express";
import { empresacontroller } from "./empresa.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEmpresaSchema } from "./DTO/CreateEmpresa.dto.js";
import { ModifyEmpresaSchema } from "./DTO/ModifyEmpresa.dto.js";
import {DeleteEmpresaSchema}  from "./DTO/DeleteEmpresa.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

export const empresarouter:Router = Router();

empresarouter.post("/empresas",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(CreateEmpresaSchema), empresacontroller.createEmpresa);
empresarouter.get("/empresas", authenticateToken,empresacontroller.findAll);
empresarouter.put("/empresas/:id",authenticateToken,ValidationMiddleware(ModifyEmpresaSchema) ,empresacontroller.updateEmpresa);
empresarouter.delete("/empresas/:id",authenticateToken,ValidationMiddleware(DeleteEmpresaSchema), empresacontroller.deleteEmpresa);