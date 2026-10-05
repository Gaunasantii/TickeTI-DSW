import { Router } from "express";
export const adminrouter:Router = Router();
import { admincontroller } from "./admin.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createAdminSchema } from "./DTO/CreateAdmin.dto.js";
import { ModifyAdminSchema } from "./DTO/ModifyAdmin.dto.js";
import { DeleteAdminSchema } from "./DTO/AdminDelete.dto.js";

adminrouter.post("/admins", ValidationMiddleware(createAdminSchema),admincontroller.createAdmin);
adminrouter.get("/admins", admincontroller.findAll);
adminrouter.put("/admins/:dni",ValidationMiddleware(ModifyAdminSchema), admincontroller.updateAdmin);
adminrouter.delete("/admins/:dni",ValidationMiddleware(DeleteAdminSchema), admincontroller.deleteAdmin);
