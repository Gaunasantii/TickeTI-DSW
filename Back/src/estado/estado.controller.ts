import { type Request, type Response } from "express";
import { EstadoDAO } from "./estado.DAO.js";
import { EstadoDTO } from "./DTO/estado.dto.js";
import { EstadoService } from "./estado.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class EstadoController {
  async createNew(req: Request, res: Response) {
      const estadoInput = req.body;
      await EstadoDAO.createState(estadoInput);

      res.status(201).json(new ApiSuccessResponse<null>(null, "Estado creado correctamente"));
  }

  async findAll(req: Request, res: Response) {
      const estados = await EstadoService.getAll()
      res.status(200).json(new ApiSuccessResponse<EstadoDTO[]>(estados, "Estados recuperados correctamente"));
  }

  async findOne(req: Request, res: Response) {
      const id = Number(req.params.id)
      const estado = await EstadoService.getEstadoById(id)
      res.status(200).json(new ApiSuccessResponse<EstadoDTO>(estado, "Estado recuperado correctamente"));
  }
}

export const estadoController = new EstadoController();