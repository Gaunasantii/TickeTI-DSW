import { type Request, type Response } from "express";
import { asignacionDAO } from "./asignacion.DAO.js";
import { AsignacionService } from "./asignacion.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import { AsignacionOutSchema, type AsignacionDto } from "./DTO/AsignacionOut.dto.js";
import type { CreateAsignacionInDto } from "./DTO/CreateAsignacion.dto.js";
import { date } from "zod";
import { wrap } from '@mikro-orm/core';
import { ChangeStateAsignacionSchema, type ChangeStateAsignacionBodyDTO, type ChangeStateAsignacionParamsDTO } from "./DTO/ChangeStateAsignacion.dto.js";

class AsignacionController {
  async findAll(req: Request, res: Response) {
      const asignacionesRecovered = await asignacionDAO.findAll({});
      const asignacionesDto=asignacionesRecovered.map(a=>AsignacionOutSchema.parse(wrap(a).toJSON()));
      res.status(200).json(new ApiSuccessResponse<AsignacionDto[]>(asignacionesDto, "Asignaciones recuperadas correctamente"));
  }

  async createAsignacion(req: Request<any,any,CreateAsignacionInDto>, res: Response) {
      const asignacionInput = req.body;
      await AsignacionService.createAsignacion(asignacionInput)
      res.status(201).json(new ApiSuccessResponse<null>(null, "Asignacion creada correctamente"));
  }

  async ChangeStateAsignacion(req: Request<ChangeStateAsignacionParamsDTO,any,ChangeStateAsignacionBodyDTO>, res: Response) {
      const id = Number(req.params.id);
      const asignacionInput = req.body;
      const asignacion = await AsignacionService.changeStateAsignacion(id, asignacionInput)
      const asignacionDto=AsignacionOutSchema.parse(wrap(asignacion).toJSON())

      res.status(200).json(new ApiSuccessResponse<AsignacionDto>(asignacionDto, "Asignacion actualizada correctamente"));
  }


  async deleteAsignacion(req: Request<ChangeStateAsignacionParamsDTO,any,any>, res: Response) {
      const id = Number(req.params.id);
      await AsignacionService.deleteAsignacion(id)
      res.status(200).json(new ApiSuccessResponse<null>(null, "Asignacion eliminada correctamente"));
  }
}

export const asignacioncontroller = new AsignacionController();