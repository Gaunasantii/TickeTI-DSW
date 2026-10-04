import { Router } from "express";
export const userrouter: Router = Router();
import { usercontroller } from "./usuario.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createUsuarioSchema } from "./DTO/CreateUsuario.dto.js";
import { ModifyUsuarioSchema } from "./DTO/ModifyUsuario.dto.js";
import { DeleteUsuarioSchema } from "./DTO/DeleteUsuario.dto.js";
import { PaginatedUserSchema } from "./DTO/PaginatedUser.dto.js";

// Solo un administrador autenticado puede listar o crear usuarios
userrouter.post("/usuarios", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(createUsuarioSchema), usercontroller.createUser);
userrouter.get("/usuarios", authenticateToken, authorizeRoles("admin"), usercontroller.findAll);

// Rutas de modificación y baja protegidas para admin
userrouter.put("/usuarios/:dni", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(ModifyUsuarioSchema), usercontroller.updateUser);
userrouter.delete("/usuarios/:dni", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(DeleteUsuarioSchema), usercontroller.deleteUser);

userrouter.get("/usuarios/paginated",authenticateToken,ValidationMiddleware(PaginatedUserSchema),usercontroller.paginatedUsers);