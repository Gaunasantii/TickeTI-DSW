import { type Request, type Response } from 'express';
import { AuthService } from './auth.services.js';
import { ApiSuccessResponse } from '../utils/api.response.js';
import { loginDto } from './DTO/login.dto.js';

export class AuthController {

  async login(req: Request, res: Response) {
    
      const { email, pass } = req.body;
      const {token,user} = await AuthService.Login(pass, email);
      res.cookie('AccessToken', token, { httpOnly: true });
      res.status(200).json(new ApiSuccessResponse<loginDto>(new loginDto(user),"Login exitoso"));
    
  }
}