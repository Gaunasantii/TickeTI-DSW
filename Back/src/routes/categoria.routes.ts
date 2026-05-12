import { Router } from "express";
export const categoriarouter:Router = Router();
import { Categoriacontroller } from "../controllers/categoria.controller.js";

categoriarouter.post("/categorias", Categoriacontroller.createCategoria);
categoriarouter.get("/categorias", Categoriacontroller.findAll);
categoriarouter.put("/categorias/:id", Categoriacontroller.updateCategoria);
categoriarouter.delete("/categorias/:id", Categoriacontroller.deleteCategoria);
