import { Router } from "express";
export const adminrouter = Router();
import { admincontroller } from "../controllers/admin.controller.js";

adminrouter.post("/admins", admincontroller.createAdmin);
adminrouter.get("/admins", admincontroller.findAll);
adminrouter.put("/admins/:dni", admincontroller.updateAdmin);
adminrouter.delete("/admins/:dni", admincontroller.deleteAdmin);
