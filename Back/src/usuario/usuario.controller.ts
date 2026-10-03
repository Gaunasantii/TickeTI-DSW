import { type Request, type Response } from "express";
import { UsuarioService } from "./usuario.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import { UsuarioOutSchema, type UsuarioOutDto } from "./DTO/UsuarioOut.dto.js";
import {wrap} from '@mikro-orm/core'
import type { CreateUsuarioInDto } from "./DTO/CreateUsuario.dto.js";
import type { ModifyUsuarioBodyDTO, ModifyUsuarioParamsDTO } from "./DTO/ModifyUsuario.dto.js";
class userController {

  async createUser(req: Request<any,any,CreateUsuarioInDto>, res: Response) {
      const userInput = {...req.body,empresa:req.user.empresa};
      await UsuarioService.createUsuario(userInput)
      res.status(201).json(new ApiSuccessResponse<null>(null,"Usuario creado Con exito"));
  };

  async findAll(req: Request, res: Response) {
      const usersRecovered = await UsuarioService.getAllUsuarios();
      const usuariosDto=usersRecovered.map(u=>UsuarioOutSchema.parse(wrap(u).toJSON()))
      res.status(200).json(new ApiSuccessResponse<UsuarioOutDto[]>(usuariosDto,"Usuarios recuperados con exito"))
  }

  async updateUser(req: Request<ModifyUsuarioParamsDTO,any,ModifyUsuarioBodyDTO>, res: Response) {
      const dni = req.params.dni as string;
      const userinput = req.body;
      await UsuarioService.updateUsuario(dni, userinput)

      return res.status(200).json(new ApiSuccessResponse<null>(null,"Usuario Actualizado con exito"));
  }

  async deleteUser(req: Request<ModifyUsuarioParamsDTO,any,any>, res: Response) {
      const dni = req.params.dni;
      await UsuarioService.deleteUsuario(dni)

      res.status(200).json(new ApiSuccessResponse<null>(null,"Usuario eliminado con exito"));
  }

}

export const usercontroller = new userController();