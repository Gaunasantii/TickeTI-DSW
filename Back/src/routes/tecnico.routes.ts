import { Router } from "express";
export const tecnicorouter = Router();
import { tecnicocontroller } from "../controllers/tecnico.controller.js";

tecnicorouter.post("/tecnicos", tecnicocontroller.createTecnico);
tecnicorouter.get("/tecnicos", tecnicocontroller.findAll);
tecnicorouter.put("/tecnicos/:id", tecnicocontroller.updateTecnico);
tecnicorouter.delete("/tecnicos/:id", tecnicocontroller.deleteTecnico);
