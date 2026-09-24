import { type Request, type Response } from "express";
import { prioridadDAO } from "./prioridad.DAO.js";
import { PrioridadDTO } from "./DTO/prioridad.dto.js";
import { PrioridadService } from "./prioridad.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
class prioridadController {

  async createPrioridad(req: Request, res: Response) {
    const prioridadInput = req.body;
    const newPrioridad = await PrioridadService.createPrioridad(prioridadInput)

    res.status(201).json(new ApiSuccessResponse<null>(null,"Nueva prioridad creada"));
  };

  async findAll(req: Request, res: Response) {
      const prioridadesRecovered = await PrioridadService.getallPrioridades()
      res.status(200).json(new ApiSuccessResponse<PrioridadDTO[]>(prioridadesRecovered,"Pioridades recuperadas exitosamente"))
  }

  async updatePrioridad(req: Request, res: Response) {
      const id = Number(req.params.id);
      const prioridadinput = req.body;

      const prioridadUpdated = await PrioridadService.updatePrioridad(prioridadinput, id)
      res.status(201).json(new ApiSuccessResponse<PrioridadDTO>(prioridadUpdated,"Prioridad actualizada correctamente"))
      ;
  }

  async deletePrioridad(req: Request, res: Response) {
      const id = Number(req.params.id);
      PrioridadService.deletePrioridad(id)

      res.status(201).json(new ApiSuccessResponse<null>(null,"Prioridad Eliminada"))
  }
}

export const prioridadcontroller = new prioridadController();