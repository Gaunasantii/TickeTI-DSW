import { type Request, type Response } from "express";
import { userDAO } from "./user.DAO.js";
import { UsuarioDTO } from "./DTO/usuario.dto.js";
import { UsuarioService } from "./usuario.service.js";

class userController {

  async createUser(req: Request, res: Response) {
    try {
      const userInput = req.body;
      const newUser = await UsuarioService.createUsuario(userInput)

      res.status(200).json({ message: "Usuario creado", data: newUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const usersRecovered = await UsuarioService.getAllUsuarios();
      res.status(200).json({ message: "Usuarios Recuperados", data: usersRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const dni = req.params.dni as string;
      const userinput = req.body;
      const updatedUsuario = await UsuarioService.updateUsuario(dni, userinput)

      return res.status(200).json({
        message: "Usuario actualizado",
        data: updatedUsuario
      });
    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const dni = req.params.dni as string;
      await UsuarioService.deleteUsuario(dni)

      res.status(204).json({
        message: "Usuario eliminado"
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }


}

export const usercontroller = new userController();