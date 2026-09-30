import { Router } from "express";
export const categoriarouter:Router = Router();
import { Categoriacontroller } from "./categoria.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateCategoriaSchema } from "./DTO/CreateCategoria.dto.js";
import { ModifyCategoriaSchema } from "./DTO/ModifyCategoria.dto.js";
import { DeleteCategoriaSchema } from "./DTO/DeleteCategoria.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

categoriarouter.post("/categorias",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateCategoriaSchema), Categoriacontroller.createCategoria);
categoriarouter.get("/categorias",authenticateToken, Categoriacontroller.findAll);
categoriarouter.put("/categorias/:id",authenticateToken,ValidationMiddleware(ModifyCategoriaSchema), Categoriacontroller.updateCategoria);
categoriarouter.delete("/categorias/:id",authenticateToken,ValidationMiddleware(DeleteCategoriaSchema), Categoriacontroller.deleteCategoria);
