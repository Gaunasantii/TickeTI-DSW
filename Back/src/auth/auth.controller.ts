import { type Request, type Response } from 'express';
import { AuthService } from './auth.services.js';

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const { mail, pass } = req.body;
      const token=AuthService.Login(pass,mail);
      res.cookie('AccesToken', token,{httpOnly:true});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    };
  }
}