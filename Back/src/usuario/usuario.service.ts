import { NotFoundError } from "../utils/base.error.js";
import { userDAO } from "./user.DAO.js";

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

  static async deleteUsuario(dni: string) {
    const userFound= await userDAO.findOne({dni:dni})
    if(!userFound)throw new NotFoundError("Usuario no encontrado")
    await userDAO.deleteUser(userFound);
  }
}