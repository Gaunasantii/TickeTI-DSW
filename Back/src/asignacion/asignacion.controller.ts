import { type Request, type Response } from "express";
import { asignacionDAO } from "./asignacion.DAO.js";
import { AsignacionService } from "./asignacion.service.js";
import { ApiPaginationResponse, ApiSuccessResponse } from "../utils/api.response.js";
import { AsignacionOutSchema, type AsignacionDto } from "./DTO/AsignacionOut.dto.js";
import type { CreateAsignacionInDto } from "./DTO/CreateAsignacion.dto.js";
import { date } from "zod";
import { wrap } from '@mikro-orm/core';
import { ChangeStateAsignacionSchema, type ChangeStateAsignacionBodyDTO, type ChangeStateAsignacionParamsDTO } from "./DTO/ChangeStateAsignacion.dto.js";
import type { PaginateAsignacionQueryDto } from "./DTO/PaginateAsignacionQuery.dto.js";

class AsignacionController {
  async findAll(req: Request, res: Response) {
      const asignacionesRecovered = await AsignacionService.getAllAsignaciones();
      const asignacionesDto=asignacionesRecovered.map(a=>AsignacionOutSchema.parse(wrap(a).toJSON()));
      res.status(200).json(new ApiSuccessResponse<AsignacionDto[]>(asignacionesDto, "Asignaciones recuperadas correctamente"));
  }

  async createAsignacion(req: Request<any,any,CreateAsignacionInDto>, res: Response) {
      const asignacionInput = {...req.body,empresa:req.user.empresa};
      //si llega asi, es pq lo creo un tecnico
      if(!asignacionInput.tecnico){
        asignacionInput.tecnico = req.user.dni;
      }
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

  async getMisAsignacionesPendientesPaginated(req: Request<any,any,any,PaginateAsignacionQueryDto>, res: Response) {
    const { page, cantPerPage } = req.query;
    const dni = req.user.dni;
    const {asignaciones, total }= await AsignacionService.getAsignacionesPendientesPaginated(Number(page), Number(cantPerPage), dni);
    const asignacionesDto = asignaciones.map(a => AsignacionOutSchema.parse(wrap(a).toJSON()));
    res.status(200).json(new ApiPaginationResponse<AsignacionDto>(asignacionesDto,{totalPages: Math.ceil(total / Number(cantPerPage)),totalItems: total,currentPage: Number(page),itemsPerPage: Number(cantPerPage)}, "Asignaciones pendientes recuperadas correctamente"));
  }

  async abandonarAsignacion(req: Request<ChangeStateAsignacionParamsDTO,any,any>, res: Response) {
    const id = Number(req.params.id);
    const dni = req.user.dni;
    await AsignacionService.abandonarMiAsignacion(id,dni)
    res.status(200).json(new ApiSuccessResponse<null>(null, "Asignacion abandonada correctamente"));
  }
}

export const asignacioncontroller = new AsignacionController();