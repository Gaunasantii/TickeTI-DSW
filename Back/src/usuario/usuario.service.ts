import { NotFoundError } from "../utils/base.error.js";
import { userDAO } from "./user.DAO.js";
import { UnauthorizedError } from "../utils/base.error.js";
import { orm } from "../config/DataBase/db.js";

export class UsuarioService {
  static async createUsuario(usuarioInput: any) {
    return await userDAO.createUser(usuarioInput);
  }

  static async getAllUsuarios() {
    return await userDAO.findAll({})
  }

  static async updateUsuario(dni: string, usuarioInput: any) {
    const userFound= await userDAO.findOne({dni:dni})
    if(!userFound)throw new NotFoundError("Usuario no encontrado")
    return await userDAO.updateUser(usuarioInput, userFound);
  }

  static async changePassword(dni: string, passwordActual: string, passwordNueva: string) {
    const user = await userDAO.findOne({dni:dni})
    if (!user) throw new NotFoundError("Usuario no encontrado");

    const coincide = passwordActual === user.pass;
    if (!coincide) {
      throw new UnauthorizedError("Contraseña actual incorrecta", "La contraseña ingresada no coincide con la actual");
    }

    user.pass = passwordNueva;
    await orm.em.flush();
  }

  static async deleteUsuario(dni: string) {
    const userFound= await userDAO.findOne({dni:dni})
    if(!userFound)throw new NotFoundError("Usuario no encontrado")
    await userDAO.deleteUser(userFound);
  }
}