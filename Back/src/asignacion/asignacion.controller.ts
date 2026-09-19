import { type Request, type Response } from "express";
import { asignacionDAO } from "./asignacion.DAO.js";
import { AsignacionDTO } from "./DTO/asignacion.dto.js";
import { AsignacionService } from "./asignacion.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class AsignacionController {
  async findAll(req: Request, res: Response) {
      const asignacionesRecovered = await asignacionDAO.findAll({});
      res.status(200).json(new ApiSuccessResponse<asignacionDAO>(asignacionesRecovered, "Asignaciones recuperadas correctamente"));
  }

  async createAsignacion(req: Request, res: Response) {
      const asignacionInput = req.body;
      const newAsignacion = await AsignacionService.createAsignacion(asignacionInput)
      res.status(201).json(new ApiSuccessResponse<null>(null, "Asignacion creada correctamente"));
  }

  async updateAsignacion(req: Request, res: Response) {
      const id = Number(req.params.id);
      req.body.fechaCierre = new Date(req.body.fechaCierre)
      const asignacionInput = req.body
      const asignacion = await AsignacionService.updateAsignacion(id, asignacionInput)

      res.status(200).json(new ApiSuccessResponse<AsignacionDTO>(asignacion, "Asignacion actualizada correctamente"));
  }


  async deleteAsignacion(req: Request, res: Response) {
      const id = Number(req.params.id);
      await AsignacionService.deleteAsignacion(id)
      res.status(200).json(new ApiSuccessResponse<null>(null, "Asignacion eliminada correctamente"));
  }
}

export const asignacioncontroller = new AsignacionController();