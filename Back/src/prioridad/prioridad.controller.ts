import { type Request, type Response } from "express";
import { prioridadDAO } from "./prioridad.DAO.js";

class prioridadController {

  async createPrioridad(req: Request, res: Response) {
    try {
      const prioridadInput = req.body;
      const newPrioridad = await prioridadDAO.createPrioridad(prioridadInput);
      res.status(201).json({ message: "Prioridad creado", data: newPrioridad });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const prioridadRecovered = await prioridadDAO.findAll({});
      res.status(200).json({ message: "Prioridades Recuperadas", data: prioridadRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePrioridad(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prioridadinput = req.body;

      const prioridadUpdated = await prioridadDAO.updatePrioridad(prioridadinput, { id: Number(id) });
      res.status(200).json({
        message: "Prioridad actualizada",
        data: prioridadUpdated
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

  async deletePrioridad(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prioridadToDelete = await prioridadDAO.deletePrioridad({ id: Number(id) });

      res.status(200).json({
        message: "Prioridad eliminada",
        data: prioridadToDelete
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }
}

export const prioridadcontroller = new prioridadController();