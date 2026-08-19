import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { adminSchema } from "./admin.entity.js";
import { adminDAO } from "./admin.DAO.js";

class AdminController {

    async createAdmin(req: Request, res: Response) {
        try {
            const adminInput = req.body;
            const newAdmin = await adminDAO.createAdmin(adminInput);
            res.status(201).json({ message: "Adminstrador creado", data: newAdmin });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const adminRecovered = await adminDAO.findAll({});
            res.status(200).json({ message: "Administradores Recuperados", data: adminRecovered })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;
            const admininput = req.body;

            const adminfound = await adminDAO.updateAdmin(admininput, { dni: dni });

            res.status(200).json({
                message: "Admistrador actualizado",
                data: adminfound
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;

            const adminfound = await adminDAO.deleteAdmin({ dni: dni });

            res.status(200).json({
                message: "Admistrador eliminado",
                data: adminfound
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const admincontroller = new AdminController();