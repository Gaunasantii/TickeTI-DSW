import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { adminSchema } from "./admin.entity.js";
import { adminDAO } from "./admin.DAO.js";
import { AdminDTO } from "./DTO/admin.dto.js";
import { adminService } from "./admin.service.js";

class AdminController {

    async createAdmin(req: Request, res: Response) {
        try {
            const adminInput = req.body;
            const newAdmin = adminService.createAdmin(adminInput)
            res.status(201).json({ message: "Adminstrador creado", data: newAdmin });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const admins = await adminService.getAllAdmins();
            res.status(200).json({ message: "Administradores Recuperados", data: admins })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;
            const admininput = req.body;
            const updatedAdmin = await adminService.updateAdmin(admininput, dni)

            res.status(200).json({
                message: "Admistrador actualizado",
                data: updatedAdmin
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;
            await adminService.deleteAdmin(dni);

            res.status(204).json({
                message: "Admistrador eliminado",
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}

export const admincontroller = new AdminController();