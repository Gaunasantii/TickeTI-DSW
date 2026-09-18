import { error } from "node:console";
import { adminDAO } from "./admin.DAO.js";
import { AdminDTO } from "./DTO/admin.dto.js";
import { NotFoundError } from "../utils/base.error.js";

export class adminService {
  static async createAdmin(adminInput: any) {
    const newAdmin = await adminDAO.createAdmin(adminInput);
    return new AdminDTO(newAdmin.dni,
      newAdmin.surName,
      newAdmin.name,
      newAdmin.tele,
      newAdmin.mail)
  }

  static async getAllAdmins() {
    const adminRecovered = await adminDAO.findAll({});

    return adminRecovered.map((admin: any) =>
      new AdminDTO(
        admin.dni,
        admin.surName,
        admin.name,
        admin.tele,
        admin.mail
      )
    );
  }

  static async updateAdmin(adminInput: any, dni: string) {
    const adminfound = await adminDAO.findOne({ dni: dni });
    if (!adminfound) throw new NotFoundError("Administrador no encontrado", `El administrador con el dni ${dni} no fue encontrado`);
    const updatedAdmin = await adminDAO.updateAdmin(adminInput, adminfound);

    return new AdminDTO(
      updatedAdmin.dni,
      updatedAdmin.surName,
      updatedAdmin.name,
      updatedAdmin.tele,
      updatedAdmin.mail
    );
  }

  
  static async deleteAdmin(dni: string): Promise<void> {
    const adminfound = await adminDAO.findOne({ dni: dni });
      if (!adminfound) throw new NotFoundError("Administrador no encontrado", `El administrador con el dni ${dni} no fue encontrado`);
    await adminDAO.deleteAdmin(adminfound);
  }
}