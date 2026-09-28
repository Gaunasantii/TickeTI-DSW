import { type Request, type Response } from "express";
<<<<<<< HEAD
import { AdminDTO } from "./DTO/admin.dto.js";
=======
import { adminSchema } from "./admin.entity.js";
import { type createAdminInDto } from "./DTO/CreateAdmin.dto.js";
>>>>>>> origin/feat/InputValidators-IN/OUT_DTO
import { adminService } from "./admin.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import { type AdminOutDto, AdminOutSchema } from "./DTO/AdminOut.dto.js";
import type { ModifyAdminBodyDTO, ModifyAdminParamsDTO } from "./DTO/ModifyAdmin.dto.js";
import { wrap } from "@mikro-orm/core";

class AdminController {
  async createAdmin(req: Request, res: Response) {
    const adminInput = req.body;
    const newAdmin = await adminService.createAdmin(adminInput);
    res.status(201).json(new ApiSuccessResponse<AdminDTO>(newAdmin, "Administrador creado correctamente"));
  }

<<<<<<< HEAD
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
=======
    async createAdmin(req: Request<any,any,createAdminInDto>, res: Response) {
            const adminInput= req.body;
            await adminService.createAdmin(adminInput)
            res.status(201).json(new ApiSuccessResponse<null>(null,"Administrador creado correctamente"));
        
    }

    async findAll(req: Request, res: Response) {
            const admins = await adminService.getAllAdmins();
            const adminsDtos = admins.map(admin=>AdminOutSchema.parse(wrap(admin).toJSON()))
            res.status(200).json(new ApiSuccessResponse<Array<AdminOutDto>>(adminsDtos, "Administradores recuperados correctamente"));
    }

    async updateAdmin(req: Request<ModifyAdminParamsDTO,any,ModifyAdminBodyDTO>, res: Response) {
            const dni = req.params.dni;
            const admininput = req.body;
            const updatedAdmin = await adminService.updateAdmin(admininput, dni);
            const adminDto=AdminOutSchema.parse(wrap(updatedAdmin).toJSON())

            res.status(200).json(new ApiSuccessResponse<AdminOutDto>(adminDto, "Administrador actualizado correctamente"));
    }

    async deleteAdmin(req: Request<ModifyAdminParamsDTO,any,any>, res: Response) {
            const dni = req.params.dni;
            await adminService.deleteAdmin(dni);
            res.status(200).json(new ApiSuccessResponse<null>(null, "Administrador eliminado correctamente"));
    }
>>>>>>> origin/feat/InputValidators-IN/OUT_DTO
}

export const admincontroller = new AdminController();