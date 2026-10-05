import { Router } from "express";
export const categoriarouter:Router = Router();
import { Categoriacontroller } from "./categoria.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateCategoriaSchema } from "./DTO/CreateCategoria.dto.js";
import { ModifyCategoriaSchema } from "./DTO/ModifyCategoria.dto.js";
import { DeleteCategoriaSchema } from "./DTO/DeleteCategoria.dto.js";

categoriarouter.post("/categorias",ValidationMiddleware(CreateCategoriaSchema), Categoriacontroller.createCategoria);
categoriarouter.get("/categorias", Categoriacontroller.findAll);
categoriarouter.put("/categorias/:id",ValidationMiddleware(ModifyCategoriaSchema), Categoriacontroller.updateCategoria);
categoriarouter.delete("/categorias/:id",ValidationMiddleware(DeleteCategoriaSchema), Categoriacontroller.deleteCategoria);
