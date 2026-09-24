import { type Request, type Response } from "express";
import { AdminDTO } from "./DTO/admin.dto.js";
import { adminService } from "./admin.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class AdminController {
  async createAdmin(req: Request, res: Response) {
    const adminInput = req.body;
    const newAdmin = await adminService.createAdmin(adminInput);
    res.status(201).json(new ApiSuccessResponse<AdminDTO>(newAdmin, "Administrador creado correctamente"));
  }

  async findAll(req: Request, res: Response) {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(new ApiSuccessResponse<Array<AdminDTO>>(admins, "Administradores recuperados correctamente"));
  }

  async updateAdmin(req: Request, res: Response) {
    const dni = req.params.dni as string;
    const admininput = req.body;
    const updatedAdmin = await adminService.updateAdmin(admininput, dni);

    res.status(200).json(new ApiSuccessResponse<AdminDTO>(updatedAdmin, "Administrador actualizado correctamente"));
  }

  async deleteAdmin(req: Request, res: Response) {
    const dni = req.params.dni as string;
    await adminService.deleteAdmin(dni);

    res.status(200).json(new ApiSuccessResponse<null>(null, "Administrador eliminado correctamente"));
  }
}

export const admincontroller = new AdminController();