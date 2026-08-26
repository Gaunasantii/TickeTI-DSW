import { type Request, type Response } from 'express';
import { AuthService } from './auth.services.js';

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const { email, pass } = req.body;
      const token = await AuthService.Login(pass, email);
      res.cookie('AccessToken', token, { httpOnly: true });
      res.status(200).json({ message: "Inicio de sesion exitoso" });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    };
  }
}