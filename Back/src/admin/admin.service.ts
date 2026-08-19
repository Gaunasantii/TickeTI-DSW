import { error } from "node:console";
import { adminDAO } from "./admin.DAO.js";
import { AdminDTO } from "./DTO/admin.dto.js";

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
    const adminfound = await adminDAO.updateAdmin(adminInput, { dni: dni });

    return new AdminDTO(
      adminfound.dni,
      adminfound.surName,
      adminfound.name,
      adminfound.tele,
      adminfound.mail
    );
  }

  static async deleteAdmin(dni: string) {
    const adminfound = await adminDAO.deleteAdmin({ dni: dni });

    if (!adminfound) throw new Error("Administrador no encontrado");
  }
}