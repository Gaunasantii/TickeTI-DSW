import { type Request, type Response } from "express";
import { oficinaDAO } from "./oficina.DAO.js";
import { OficinaDTO } from "./DTO/oficina.dto.js";
import { OficinaService } from "./oficina.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class oficinaController {

  async createOficina(req: Request, res: Response) {
      const oficinaInput = req.body;
      await OficinaService.createOficina(oficinaInput)
      res.status(201).json(new ApiSuccessResponse<null>(null,"Oficina Creada con exito"));
    
  }

  async findAll(req: Request, res: Response) {
      const oficinas = await OficinaService.getAll();
      res.status(200).json(new ApiSuccessResponse<OficinaDTO[]>(oficinas,"Oficinas recuperadas con exito"))
  }

  async updateOficina(req: Request, res: Response) {
      const id = Number(req.params.id);
      const oficinainput = req.body;
      await OficinaService.updateOficina(id, oficinainput);

      res.status(200).json(new ApiSuccessResponse<null>(null,"Oficina actualizada con exito"));
  }

  async deleteOficina(req: Request, res: Response) {
      const id = Number(req.params.id);
      await OficinaService.deleteOficina(id)
      res.status(200).json(new ApiSuccessResponse<null>(null,"Oficina eliminada con exito"));
  }


}

export const oficinacontroller = new oficinaController();