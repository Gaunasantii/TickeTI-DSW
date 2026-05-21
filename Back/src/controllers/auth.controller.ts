import { type Request, type Response } from 'express';
import { orm } from '../config/db.js';
import { UserSchema } from '../models/usuario.entity.js';

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const em = orm.em.fork();
      const { mail, pass } = req.body;
      const user = await em.findOneOrFail(UserSchema, { mail, pass });
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    };
  }
}