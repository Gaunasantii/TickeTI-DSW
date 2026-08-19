import { type Request, type Response } from "express";
import { tecnicoDAO } from "./tecnico.DAO.js";

class tecnicoController {

  async createTecnico(req: Request, res: Response) {
    try {
      const tecnicoInput = req.body;
      const newTecnico = await tecnicoDAO.createTecnico(tecnicoInput);
      res.status(201).json({ message: "Tecnico creado", data: newTecnico });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const tecnicosRecovered = await tecnicoDAO.findAll({ populate: ['asignaciones'] });
      res.status(200).json({ message: "Tecnicos Recuperados", data: tecnicosRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni;
      const tecnicoinput = req.body;
      const updatedTecnico = await tecnicoDAO.updateTecnico(tecnicoinput, { dni: dni as string });

      return res.status(200).json({
        message: "Tecnico actualizado",
        data: updatedTecnico
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  async deleteTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni;
      const deletedTecnico = await tecnicoDAO.deleteTecnico({ dni: dni as string });
      return res.status(200).json({
        message: "Tecnico eliminado",
        data: deletedTecnico
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
}
export const tecnicocontroller = new tecnicoController();