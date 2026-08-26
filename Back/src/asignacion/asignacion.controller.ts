import { type Request, type Response } from "express";
import { asignacionDAO } from "./asignacion.DAO.js";
import { AsignacionDTO } from "./DTO/asignacion.dto.js";
import { AsignacionService } from "./asignacion.service.js";

class AsignacionController {
  async findAll(req: Request, res: Response) {
    try {
      const asignacionesRecovered = await asignacionDAO.findAll({});
      res.status(200).json({ message: "asignaciones Recuperadas", data: asignacionesRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createAsignacion(req: Request, res: Response) {
    try {
      const asignacionInput = req.body;
      const newAsignacion = await AsignacionService.createAsignacion(asignacionInput)
      res.status(200).json({ message: "asignacion creada", data: newAsignacion });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAsignacion(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      req.body.fechaCierre = new Date(req.body.fechaCierre)
      const asignacionInput = req.body
      const asignacion = await AsignacionService.updateAsignacion(id, asignacionInput)

      res.status(200).json({
        message: "asignacion actualizada",
        data: asignacion
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }


  async deleteAsignacion(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AsignacionService.deleteAsignacion(id)
      res.status(204).json({
        message: "asignacion eliminada",
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }
}

export const asignacioncontroller = new AsignacionController();