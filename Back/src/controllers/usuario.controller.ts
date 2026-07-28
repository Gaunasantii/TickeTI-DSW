import { type Request, type Response } from "express";
import { userDAO } from "../DAO/user.DAO.js";
import { UsuarioDTO } from "../DTO/usuario.dto.js";
class userController {

  async createUser(req: Request, res: Response) {
    try {
      const userInput = req.body;
      const newUser = await userDAO.createUser(userInput);
      
      const usuarioDTO = new UsuarioDTO(
        newUser.dni,
        newUser.surName,
        newUser.name,
        newUser.tele,
        newUser.mail,
        newUser.oficina?.id
      );

      res.status(201).json({ message: "Usuario creado", data: usuarioDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const usersRecovered = await userDAO.findAll({})
      
      const usuariosDTO = usersRecovered.map((user: any) =>
        new UsuarioDTO(
          user.dni,
          user.surName,
          user.name,
          user.tele,
          user.mail,
          user.oficina?.id
        )
      );

      res.status(200).json({ message: "Usuarios Recuperados", data: usuariosDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { dni } = req.params;
      const userinput = req.body;

      const userfound = await userDAO.updateUser(userinput, { dni: (dni as string) });

      const usuarioDTO = new UsuarioDTO(
        userfound.dni,
        userfound.surName,
        userfound.name,
        userfound.tele,
        userfound.mail,
        userfound.oficina?.id
      );

      return res.status(200).json({
        message: "Usuario actualizado",
        data: usuarioDTO
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { dni } = req.params;
      const userDeleted = await userDAO.deleteUser({ dni: (dni as string) });
      
      const usuarioDTO = new UsuarioDTO(
        userDeleted.dni,
        userDeleted.surName,
        userDeleted.name,
        userDeleted.tele,
        userDeleted.mail,
        userDeleted.oficina?.id
      );

      res.status(200).json({
        message: "Usuario eliminado",
        data: usuarioDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }


}

export const usercontroller = new userController();