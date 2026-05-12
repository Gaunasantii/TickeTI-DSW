import { Router } from "express";
import { empresacontroller } from "../controllers/empresa.controller.js";

export const empresarouter:Router = Router();

empresarouter.post("/empresas", empresacontroller.createEmpresa);
empresarouter.get("/empresas", empresacontroller.findAll);
empresarouter.put("/empresas/:id", empresacontroller.updateEmpresa);
empresarouter.delete("/empresas/:id", empresacontroller.deleteEmpresa);