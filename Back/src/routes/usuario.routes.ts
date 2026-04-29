import { Router } from "express";
export const userrouter = Router();
import { usercontroller } from "../controllers/user.controller.js";

userrouter.post("/usuarios", usercontroller.createUser);
userrouter.get("/usuarios", usercontroller.findAll);
userrouter.put("/usuarios/:dni", usercontroller.updateUser);
userrouter.delete("/usuarios/:dni", usercontroller.deleteUser);
