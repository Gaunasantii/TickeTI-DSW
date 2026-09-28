import { error } from "node:console";
import { adminDAO } from "./admin.DAO.js";
import { type createAdminInDto } from "./DTO/CreateAdmin.dto.js";
import { NotFoundError } from "../utils/base.error.js";
import type { ModifyAdminBodyDTO } from "./DTO/ModifyAdmin.dto.js";

export class adminService {
  static async createAdmin(adminInput: createAdminInDto) {
    return await adminDAO.createAdmin(adminInput);
  }

  static async getAllAdmins() {
    return await adminDAO.findAll({});
  }

  static async updateAdmin(adminInput: ModifyAdminBodyDTO, dni: string) {
    const adminfound = await adminDAO.findOne({ dni: dni });
    if (!adminfound) throw new NotFoundError("Administrador no encontrado", `El administrador con el dni ${dni} no fue encontrado`);
    return await adminDAO.updateAdmin(adminInput, adminfound);
  }

  
  static async deleteAdmin(dni: string): Promise<void> {
    const adminfound = await adminDAO.findOne({ dni: dni });
      if (!adminfound) throw new NotFoundError("Administrador no encontrado", `El administrador con el dni ${dni} no fue encontrado`);
    await adminDAO.deleteAdmin(adminfound);
  }
}