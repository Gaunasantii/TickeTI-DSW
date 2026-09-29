import { type Request, type Response } from 'express';
import { AuthService } from './auth.services.js';
import { ApiSuccessResponse } from '../utils/api.response.js';
import type { LoginInDto } from './DTO/LoginIn.dto.js';
import { LoginOutSchema, type LoginDto } from './DTO/LoginOut.dto.js';
import { wrap } from '@mikro-orm/core';

export class AuthController {

  async login(req: Request<any,any,LoginInDto>, res: Response) {
      const { email, pass } = req.body;
      const {token,user} = await AuthService.Login(pass, email);
      res.cookie('AccessToken', token, { httpOnly: true });
      res.status(200).json(new ApiSuccessResponse<LoginDto>(LoginOutSchema.parse(wrap(user).toJSON()),"Login exitoso"));
  }

  async logout(req:Request,res:Response){
    res.clearCookie('AccessToken',{ httpOnly: true });
    res.status(200).json(new ApiSuccessResponse<null>(null,"Logout Exitoso"));
  }
}