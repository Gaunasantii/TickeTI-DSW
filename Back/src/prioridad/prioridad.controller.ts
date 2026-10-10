import { type Request, type Response } from "express";
import { PrioridadService } from "./prioridad.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreatePrioridadInDto } from "./DTO/CreatePrioridad.dto.js";
import { PrioridadOutSchema, type PrioridadDto } from "./DTO/PrioridadOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { ModifyPrioridadInBodyDto, ModifyPrioridadInParamsDto } from "./DTO/ModifyPrioridad.dto.js";
import type { PaginatedPrioridadQueryDtoType } from "./DTO/PaginatedPrioridadQuery.dto.js";
import { ApiPaginationResponse } from "../utils/api.response.js";
class prioridadController {

  async createPrioridad(req: Request<any,any,CreatePrioridadInDto>, res: Response) {
    const prioridadInput = {...req.body,empresa:req.user.empresa};
    await PrioridadService.createPrioridad(prioridadInput)
    res.status(201).json(new ApiSuccessResponse<null>(null,"Nueva prioridad creada"));
  };

  async findAll(req: Request, res: Response) {
      const prioridadesRecovered = await PrioridadService.getallPrioridades()
      const prioridadesDto=prioridadesRecovered.map(p=>PrioridadOutSchema.parse(wrap(p).toJSON()));
      res.status(200).json(new ApiSuccessResponse<PrioridadDto[]>(prioridadesDto,"Pioridades recuperadas exitosamente"))
  }

  async updatePrioridad(req: Request<ModifyPrioridadInParamsDto,any,ModifyPrioridadInBodyDto>, res: Response) {
      const id = Number(req.params.id);
      const prioridadinput = req.body;
      const prioridadUpdated = await PrioridadService.updatePrioridad(prioridadinput, id)
      const prioridadDto=PrioridadOutSchema.parse(prioridadUpdated);
      res.status(201).json(new ApiSuccessResponse<PrioridadDto>(prioridadDto,"Prioridad actualizada correctamente"))
      ;
  }

  async deletePrioridad(req: Request<ModifyPrioridadInParamsDto,any,any>, res: Response) {
      const id = Number(req.params.id);
      await PrioridadService.deletePrioridad(id)
      res.status(200).json(new ApiSuccessResponse<null>(null,"Prioridad Eliminada"))
  }

  async findPaginatedPrioridades(req: Request<any,any,any,PaginatedPrioridadQueryDtoType>, res: Response) {
      const page = Number(req.query.page);
      const cantPerPage = Number(req.query.cantPerPage);
      const {data,total} = await PrioridadService.getPaginatedPrioridades(page, cantPerPage);
      const prioridadDtos=data.map(p=>PrioridadOutSchema.parse(wrap(p).toJSON()));
      res.status(200).json(new ApiPaginationResponse<PrioridadDto>(prioridadDtos,
        {totalItems: total,
        totalPages: Math.ceil(total / Number(cantPerPage)),
        currentPage: Number(page),
        itemsPerPage: Number(cantPerPage)},
      "Prioridades paginadas recuperadas exitosamente"));
  }
}

export const prioridadcontroller = new prioridadController();