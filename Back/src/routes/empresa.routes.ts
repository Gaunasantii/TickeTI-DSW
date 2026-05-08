import { Router } from "express";
export const empresarouter = Router();
import { empresacontroller } from "../controllers/empresa.controller.js";

empresarouter.post("/empresas", empresacontroller.createEmpresa);
empresarouter.get("/empresas", empresacontroller.findAll);
empresarouter.put("/empresas/:id", empresacontroller.updateEmpresa);
empresarouter.delete("/empresas/:id", empresacontroller.deleteEmpresa);