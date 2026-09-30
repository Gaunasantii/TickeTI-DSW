import { Router } from "express";
export const adminrouter:Router = Router();
import { admincontroller } from "./admin.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createAdminSchema } from "./DTO/CreateAdmin.dto.js";
import { ModifyAdminSchema } from "./DTO/ModifyAdmin.dto.js";
import { DeleteAdminSchema } from "./DTO/AdminDelete.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

adminrouter.post("/admins",authenticateToken,authorizeRoles('S_ADMIN'), ValidationMiddleware(createAdminSchema),admincontroller.createAdmin);
adminrouter.get("/admins",authenticateToken,admincontroller.findAll);
adminrouter.put("/admins/:dni",authenticateToken,ValidationMiddleware(ModifyAdminSchema), admincontroller.updateAdmin);
adminrouter.delete("/admins/:dni",authenticateToken,ValidationMiddleware(DeleteAdminSchema), admincontroller.deleteAdmin);
