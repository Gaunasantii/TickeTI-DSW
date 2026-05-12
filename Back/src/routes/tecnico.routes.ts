import { Router } from "express";
export const tecnicorouter: Router = Router();
import { tecnicocontroller } from "../controllers/tecnico.controller.js";

tecnicorouter.post("/tecnicos", tecnicocontroller.createTecnico);
tecnicorouter.get("/tecnicos", tecnicocontroller.findAll);
tecnicorouter.put("/tecnicos/:dni", tecnicocontroller.updateTecnico);
tecnicorouter.delete("/tecnicos/:dni", tecnicocontroller.deleteTecnico);
