import { Router } from "express";
export const tecnicorouter: Router = Router();
import { tecnicocontroller } from "./tecnico.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createTecnicoSchema } from "./DTO/CreateTecnico.dto.js";
import { ModifyTecnicoSchema } from "./DTO/ModifyTecnico.dto.js";
import { DeleteTecnicoSchema } from "./DTO/DeleteTecnico.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

tecnicorouter.post("/tecnicos",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(createTecnicoSchema), tecnicocontroller.createTecnico);
tecnicorouter.get("/tecnicos", tecnicocontroller.findAll);
tecnicorouter.put("/tecnicos/:dni",ValidationMiddleware(ModifyTecnicoSchema) ,tecnicocontroller.updateTecnico);
tecnicorouter.delete("/tecnicos/:dni",ValidationMiddleware(DeleteTecnicoSchema), tecnicocontroller.deleteTecnico);
