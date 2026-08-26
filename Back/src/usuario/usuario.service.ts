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
    const userfound = await userDAO.updateUser(usuarioInput, { dni: dni });

    return new UsuarioDTO(
      userfound.dni,
      userfound.surName,
      userfound.name,
      userfound.tele,
      userfound.mail,
      userfound.oficina?.id
    );
  }

  static async deleteUsuario(dni: string) {
    await userDAO.deleteUser(dni);
  }
}