import { Router } from "express";
export const oficinarouter = Router();
import { oficinacontroller } from "../controllers/oficina.controller.js";

oficinarouter.post("/oficinas", oficinacontroller.createOficina);
oficinarouter.get("/oficinas", oficinacontroller.findAll);
oficinarouter.put("/oficinas/:id", oficinacontroller.updateOficina);
oficinarouter.delete("/oficinas/:id", oficinacontroller.deleteOficina);
