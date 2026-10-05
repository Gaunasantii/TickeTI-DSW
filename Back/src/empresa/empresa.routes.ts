import { Router } from "express";
import { empresacontroller } from "./empresa.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEmpresaSchema } from "./DTO/CreateEmpresa.dto.js";
import { ModifyEmpresaSchema } from "./DTO/ModifyEmpresa.dto.js";
import {DeleteEmpresaSchema}  from "./DTO/DeleteEmpresa.dto.js";

export const empresarouter:Router = Router();

empresarouter.post("/empresas",ValidationMiddleware(CreateEmpresaSchema), empresacontroller.createEmpresa);
empresarouter.get("/empresas", empresacontroller.findAll);
empresarouter.put("/empresas/:id",ValidationMiddleware(ModifyEmpresaSchema) ,empresacontroller.updateEmpresa);
empresarouter.delete("/empresas/:id",ValidationMiddleware(DeleteEmpresaSchema), empresacontroller.deleteEmpresa);