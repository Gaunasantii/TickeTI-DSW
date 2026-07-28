import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { adminSchema } from "../models/admin.entity.js";
import { adminDAO } from "../DAO/admin.DAO.js";
import { AdminDTO } from "../DTO/admin.dto.js";

class AdminController {

    async createAdmin(req: Request, res: Response) {
        try {
            const adminInput = req.body;
            const newAdmin = await adminDAO.createAdmin(adminInput);

            const adminDTO = new AdminDTO(
                newAdmin.dni,
                newAdmin.surName,
                newAdmin.name,
                newAdmin.tele,
                newAdmin.mail
            );

            res.status(201).json({ message: "Adminstrador creado", data: adminDTO });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const adminRecovered = await adminDAO.findAll({});

            const adminDTOs = adminRecovered.map((admin: any) =>
                new AdminDTO(
                    admin.dni,
                    admin.surName,
                    admin.name,
                    admin.tele,
                    admin.mail
                )
            );

            res.status(200).json({ message: "Administradores Recuperados", data: adminDTOs })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;
            const admininput = req.body;

            const adminfound = await adminDAO.updateAdmin(admininput, { dni: dni });

            const adminDTO = new AdminDTO(
                adminfound.dni,
                adminfound.surName,
                adminfound.name,
                adminfound.tele,
                adminfound.mail
            );


            res.status(200).json({
                message: "Admistrador actualizado",
                data: adminDTO
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAdmin(req: Request, res: Response) {
        try {
            const dni = req.params.dni as string;

            const adminfound = await adminDAO.deleteAdmin({ dni: dni });

            const adminDTO = new AdminDTO(
                adminfound.dni,
                adminfound.surName,
                adminfound.name,
                adminfound.tele,
                adminfound.mail
            );

            res.status(200).json({
                message: "Admistrador eliminado",
                data: adminDTO
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const admincontroller = new AdminController();