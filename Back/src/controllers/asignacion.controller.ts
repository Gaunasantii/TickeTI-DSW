import { type Request, type Response } from "express";
import { asignacionDAO } from "../DAO/asignacion.DAO.js";
import { AsignacionDTO } from "../DTO/asignacion/asignacion.dto.js";

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
      const newAsignacion = await asignacionDAO.createAsignacion(asignacionInput);
      
      const asignacionDTO = new AsignacionDTO(
        newAsignacion.fechaCreacion,
        newAsignacion.fechaCierre,
        newAsignacion.estado,
        newAsignacion.ticket?.id,
        newAsignacion.tecnico?.dni,
        newAsignacion.id
      );

      res.status(201).json({ message: "asignacion creada", data: asignacionDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAsignacion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      req.body.fechaCierre = new Date(req.body.fechaCierre)
      const asignacionInput = req.body

      const asignacionFound = await asignacionDAO.updateAsignacion(asignacionInput, { id: Number(id) });
      
      const asignacionDTO = new AsignacionDTO(
        asignacionFound.fechaCreacion,
        asignacionFound.fechaCierre,
        asignacionFound.estado,
        asignacionFound.ticket?.id,
        asignacionFound.tecnico?.dni,
        asignacionFound.id
      );

      res.status(200).json({
        message: "asignacion actualizada",
        data: asignacionDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }


  async deleteAsignacion(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const asignacionFound = await asignacionDAO.deleteAsignacion({ id: Number(id) });

      const asignacionDTO = new AsignacionDTO(
        asignacionFound.fechaCreacion,
        asignacionFound.fechaCierre,
        asignacionFound.estado,
        asignacionFound.ticket?.id,
        asignacionFound.tecnico?.dni,
        asignacionFound.id
      );

      res.status(200).json({
        message: "asignacion eliminada",
        data: asignacionFound
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }
}

export const asignacioncontroller = new AsignacionController();