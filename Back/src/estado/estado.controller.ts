import { type Request, type Response } from "express";
import { EstadoDAO } from "./estado.DAO.js";
import { EstadoService } from "./estado.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateEstadoInDto } from "./DTO/CreateEstado.dto.js";
import { EstadoOutSchema, type EstadoDto } from "./DTO/EstadoOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { FindOneEstadoInDto } from "./DTO/FindOneEstado.dto.js";

class EstadoController {
  async createNew(req: Request<any,any,CreateEstadoInDto>, res: Response) {
      const estadoInput = req.body;
      await EstadoDAO.createState(estadoInput);
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
}

export const estadoController = new EstadoController();