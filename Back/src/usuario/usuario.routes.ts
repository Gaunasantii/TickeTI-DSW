import { Router } from "express";
export const userrouter: Router = Router();
import { usercontroller } from "./usuario.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.ts";
import { authorizeRoles } from "../middlewares/role.middleware.ts";

// Solo un administrador autenticado puede listar o crear usuarios
userrouter.post("/usuarios", authenticateToken, authorizeRoles("admin"), usercontroller.createUser);
userrouter.get("/usuarios", authenticateToken, authorizeRoles("admin"), usercontroller.findAll);

// Rutas de modificación y baja protegidas para admin
userrouter.put("/usuarios/:dni", authenticateToken, authorizeRoles("admin"), usercontroller.updateUser);
userrouter.delete("/usuarios/:dni", authenticateToken, authorizeRoles("admin"), usercontroller.deleteUser);