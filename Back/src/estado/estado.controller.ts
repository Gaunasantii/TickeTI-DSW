import { type Request, type Response } from "express";
import type { PaginateEstadoQueryDto } from "./DTO/PaginateEstadoQuery.dto.js";
import { EstadoDAO } from "./estado.DAO.js";
import { EstadoService } from "./estado.service.js";
import { ApiSuccessResponse, ApiPaginationResponse } from "../utils/api.response.js";
import type { CreateEstadoInDto } from "./DTO/CreateEstado.dto.js";
import { EstadoOutSchema, type EstadoDto } from "./DTO/EstadoOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { FindOneEstadoInDto } from "./DTO/FindOneEstado.dto.js";
import type { UpdateEstadoDTOType } from "./DTO/UpdateEstado.dto.js";
class EstadoController {
  async createNew(req: Request<any,any,CreateEstadoInDto>, res: Response) {
      const estadoInput = {...req.body,empresa:req.user.empresa}
      await EstadoService.createEstado(estadoInput);
      res.status(201).json(new ApiSuccessResponse<null>(null, "Estado creado correctamente"));
  }

  async findAll(req: Request, res: Response) {
      const estados = await EstadoService.getAll()
      const estadosDto =estados.map(e=>EstadoOutSchema.parse(wrap(e).toJSON()))
      res.status(200).json(new ApiSuccessResponse<EstadoDto[]>(estadosDto, "Estados recuperados correctamente"));
  }

  async findOne(req: Request<FindOneEstadoInDto,any,any>, res: Response) {
      const id = Number(req.params.id);
      const estado = await EstadoService.getEstadoById(id);
      const estadoDto = EstadoOutSchema.parse(wrap(estado).toJSON());
      res.status(200).json(new ApiSuccessResponse<EstadoDto>(estadoDto, "Estado recuperado correctamente"));
  }

  async getPaginated(req: Request<any,any,any,PaginateEstadoQueryDto>, res: Response) {
      const page = Number(req.query.page);
      const limit = Number(req.query.cantPerPage);
      const { estados, total } = await EstadoService.getEstadosPaginated(page, limit);
      const estadosDto = estados.map(e => EstadoOutSchema.parse(wrap(e).toJSON()));
      res.status(200).json(new ApiPaginationResponse<EstadoDto>(estadosDto,{totalItems: total,totalPages: Math.ceil(total / Number(limit)),currentPage: Number(page),itemsPerPage: Number(limit)},"Paginado de estados recuperado"));
  }

  async delete(req: Request<FindOneEstadoInDto,any,any>, res: Response) {
      const id = Number(req.params.id);
      await EstadoService.deleteEstado(id);
      res.status(200).json(new ApiSuccessResponse<null>(null, "Estado eliminado correctamente"));
  }

  async update(req: Request<FindOneEstadoInDto,any,UpdateEstadoDTOType>, res: Response) {
      const id = Number(req.params.id);
      const estadoInput = req.body;
      await EstadoService.updateEstado(id, estadoInput);
      res.status(200).json(new ApiSuccessResponse<null>(null, "Estado actualizado correctamente"));
  }
}

export const estadoController = new EstadoController();