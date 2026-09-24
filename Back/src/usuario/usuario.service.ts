import { NotFoundError } from "../utils/base.error.js";
import { UsuarioDTO } from "./DTO/usuario.dto.js";
import { userDAO } from "./user.DAO.js";

export class UsuarioService {
  static async createUsuario(usuarioInput: any) {
    const newUser = await userDAO.createUser(usuarioInput);

    return new UsuarioDTO(
      newUser.dni,
      newUser.surName,
      newUser.name,
      newUser.tele,
      newUser.mail,
      newUser.oficina?.id
    );
  }

  static async getAllUsuarios() {
    const usersRecovered = await userDAO.findAll({})

    return usersRecovered.map((user: any) =>
      new UsuarioDTO(
        user.dni,
        user.surName,
        user.name,
        user.tele,
        user.mail,
        user.oficina?.id
      )
    );
  }

  static async updateUsuario(dni: string, usuarioInput: any) {
    const userFound= await userDAO.findOne({dni:dni})
    if(!userFound)throw new NotFoundError("Usuario no encontrado")
    const userUpdated = await userDAO.updateUser(usuarioInput, userFound);

    return new UsuarioDTO(
      userUpdated.dni,
      userUpdated.surName,
      userUpdated.name,
      userUpdated.tele,
      userUpdated.mail,
      userUpdated.oficina?.id
    );
  }

  static async deleteUsuario(dni: string) {
    const userFound= await userDAO.findOne({dni:dni})
    if(!userFound)throw new NotFoundError("Usuario no encontrado")
    await userDAO.deleteUser(userFound);
  }
}