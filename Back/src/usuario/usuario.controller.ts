import { type Request, type Response } from "express";
import { userDAO } from "./user.DAO.js";
class userController {

  async createUser(req: Request, res: Response) {
    try {
      const userInput = req.body;
      const newUser = await userDAO.createUser(userInput);
      res.status(201).json({ message: "Usuario creado", data: newUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const usersRecovered = await userDAO.findAll({})
      res.status(200).json({ message: "Usuarios Recuperados", data: usersRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { dni } = req.params;
      const userinput = req.body;

      const userfound = await userDAO.updateUser(userinput, { dni: (dni as string) });

      return res.status(200).json({
        message: "Usuario actualizado",
        data: userfound//posteriormente reemplazar por un objeto usuario
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
      res.status(200).json({
        message: "Usuario eliminado",
        data: userDeleted
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }


}

export const usercontroller = new userController();