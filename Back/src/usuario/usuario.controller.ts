import { type Request, type Response } from "express";
import { userDAO } from "./user.DAO.js";
import { UsuarioDTO } from "./DTO/usuario.dto.js";
import { UsuarioService } from "./usuario.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class userController {

  async createUser(req: Request, res: Response) {
      const userInput = req.body;
      await UsuarioService.createUsuario(userInput)

      res.status(201).json(new ApiSuccessResponse<null>(null,"Usuario creado Con exito"));
  };

  async findAll(req: Request, res: Response) {
      const usersRecovered = await UsuarioService.getAllUsuarios();
      res.status(200).json(new ApiSuccessResponse<UsuarioDTO[]>(usersRecovered,"Usuarios recuperados con exito"))
  }

  async updateUser(req: Request, res: Response) {
      const dni = req.params.dni as string;
      const userinput = req.body;
      await UsuarioService.updateUsuario(dni, userinput)

      return res.status(200).json(new ApiSuccessResponse<null>(null,"Usuario Actualizado con exito"));
  }

  async deleteUser(req: Request, res: Response) {
      const dni = req.params.dni as string;
      await UsuarioService.deleteUsuario(dni)

      res.status(200).json(new ApiSuccessResponse<null>(null,"Usuario eliminado con exito"));
  }

}

export const usercontroller = new userController();