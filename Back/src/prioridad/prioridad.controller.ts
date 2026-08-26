import { type Request, type Response } from "express";
import { prioridadDAO } from "./prioridad.DAO.js";
import { PrioridadDTO } from "./DTO/prioridad.dto.js";
import { PrioridadService } from "./prioridad.service.js";

class prioridadController {

  async createPrioridad(req: Request, res: Response) {
    try {
      const prioridadInput = req.body;
      const newPrioridad = await PrioridadService.createPrioridad(prioridadInput)

      res.status(200).json({ message: "Prioridad creado", data: newPrioridad });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const prioridadesRecovered = await PrioridadService.getallPrioridades()

      res.status(200).json({ message: "Prioridades Recuperadas", data: prioridadesRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePrioridad(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const prioridadinput = req.body;

      const prioridadUpdated = await PrioridadService.updatePrioridad(prioridadinput, id)
      res.status(200).json({
        message: "Prioridad actualizada",
        data: prioridadUpdated
      });

    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }

  async deletePrioridad(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      PrioridadService.deletePrioridad(id)

      res.status(204).json({
        message: "Prioridad eliminada"
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }
}

export const prioridadcontroller = new prioridadController();