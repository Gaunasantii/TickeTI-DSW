import { ConflictError, NotFoundError } from "../utils/base.error.js";
import { userDAO } from "./user.DAO.js";
import { type CreateUsuarioInDto} from "./DTO/CreateUsuario.dto.js";
import { oficinaDAO } from "../oficinas/oficina.DAO.js";

export class UsuarioService {
  static async createUsuario(usuarioInput: CreateUsuarioInDto) {
    const userFound= await userDAO.findOne({dni:usuarioInput.dni})
    if(userFound)throw new ConflictError("Usuario ya existente");
    const OficinaFound= await oficinaDAO.findOne({id:usuarioInput.oficina})
    if(OficinaFound)throw new NotFoundError("Oficina Inexistente");
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