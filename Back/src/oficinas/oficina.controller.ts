import { type Request, type Response } from "express";
import { OficinaService } from "./oficina.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateOficinaInDto } from "./DTO/CreateOficina.dto.ts.js";
import { OficinaOutSchema, type OficinaDto } from "./DTO/OficinaOut.dto.js";
import { wrap } from '@mikro-orm/core'
import type { ModifyOficinaInBodyDto, ModifyOficinaInParamsDto } from "./DTO/ModifyOficina.dto.js";

class oficinaController {

  async createOficina(req: Request<any,any,CreateOficinaInDto>, res: Response) {
      const oficinaInput = req.body;
      await OficinaService.createOficina(oficinaInput)
      res.status(201).json(new ApiSuccessResponse<null>(null,"Oficina Creada con exito"));
    
  }

  async findAll(req: Request, res: Response) {
      const oficinas = await OficinaService.getAll();
      const oficinasDto=oficinas.map(o=>OficinaOutSchema.parse(wrap(o).toJSON()))
      res.status(200).json(new ApiSuccessResponse<OficinaDto[]>(oficinasDto,"Oficinas recuperadas con exito"))
  }

  async updateOficina(req: Request<ModifyOficinaInParamsDto,any,ModifyOficinaInBodyDto>, res: Response) {
      const id = Number(req.params.id);
      const oficinainput = req.body;
      await OficinaService.updateOficina(id, oficinainput);

      res.status(200).json(new ApiSuccessResponse<null>(null,"Oficina actualizada con exito"));
  }

  async deleteOficina(req: Request<ModifyOficinaInParamsDto,any,any>, res: Response) {
      const id = Number(req.params.id);
      await OficinaService.deleteOficina(id)
      res.status(200).json(new ApiSuccessResponse<null>(null,"Oficina eliminada con exito"));
  }


}

export const oficinacontroller = new oficinaController();