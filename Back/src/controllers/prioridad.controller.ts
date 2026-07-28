import { type Request, type Response } from "express";
import { prioridadDAO } from "../DAO/prioridad.DAO.js";
import { PrioridadDTO } from "../DTO/prioridad.dto.js";

class prioridadController {

  async createPrioridad(req: Request, res: Response) {
    try {
      const prioridadInput = req.body;
      const newPrioridad = await prioridadDAO.createPrioridad(prioridadInput);
      
      const prioridadDTO = new PrioridadDTO(
        newPrioridad.nombre,
        newPrioridad.tiempoLimiteResolucion,
        newPrioridad.id
      );

      res.status(201).json({ message: "Prioridad creado", data: prioridadDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const prioridadRecovered = await prioridadDAO.findAll({});
      
      const prioridadesDTO = prioridadRecovered.map((prioridad: any) =>
        new PrioridadDTO(
          prioridad.nombre,
          prioridad.tiempoLimiteResolucion,
          prioridad.id
        )
      );

      res.status(200).json({ message: "Prioridades Recuperadas", data: prioridadesDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePrioridad(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prioridadinput = req.body;

      const prioridadUpdated = await prioridadDAO.updatePrioridad(prioridadinput, { id: Number(id) });

      const prioridadDTO = new PrioridadDTO(
        prioridadUpdated.nombre,
        prioridadUpdated.tiempoLimiteResolucion,
        prioridadUpdated.id
      );

      res.status(200).json({
        message: "Prioridad actualizada",
        data: prioridadDTO
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
      
      const prioridadDTO = new PrioridadDTO(
        prioridadToDelete.nombre,
        prioridadToDelete.tiempoLimiteResolucion,
        prioridadToDelete.id
      );

      res.status(200).json({
        message: "Prioridad eliminada",
        data: prioridadDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }
}

export const prioridadcontroller = new prioridadController();