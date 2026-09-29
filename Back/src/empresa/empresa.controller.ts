import { type Request, type Response } from "express";
import { EmpresaService } from "./empresa.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateEmpresaInDto } from "./DTO/CreateEmpresa.dto.js";
import { EmpresaOutSchema, type EmpresaDto } from "./DTO/EmpresaOut.dto.js";
import {wrap} from '@mikro-orm/core'
import type { ModifyEmpresaSchemaInBodyDto, ModifyEmpresaSchemaInParamsDto } from "./DTO/ModifyEmpresa.dto.js";
class empresaController {

  async createEmpresa(req: Request<any,any,CreateEmpresaInDto>, res: Response) {
      const empresaInput = req.body;
      EmpresaService.createEmpresa(empresaInput)
      res.status(201).json(new ApiSuccessResponse<null>(null,"Empresa creada con exito"));
  };

  async findAll(req: Request, res: Response) {
      const empresas = await EmpresaService.getAllEmpresas()
      const empresasDto=empresas.map(e=>EmpresaOutSchema.parse(wrap(e).toJSON()))
      res.status(200).json(new ApiSuccessResponse<EmpresaDto[]>(empresasDto,"Empresas recuperadas con exito"))
  }

  async updateEmpresa(req: Request<ModifyEmpresaSchemaInParamsDto,any,ModifyEmpresaSchemaInBodyDto>, res: Response) {
      const id = Number(req.params.id);
      const empresainput = req.body;
      const updatedEmpresa = await EmpresaService.updateEmpresa(id, empresainput);
      const empresaDto=EmpresaOutSchema.parse(wrap(updatedEmpresa).toJSON());
      res.status(200).json(new ApiSuccessResponse<EmpresaDto>(empresaDto,"Empresa actualizada con exito"));
  }

  async deleteEmpresa(req: Request<ModifyEmpresaSchemaInParamsDto,any,any>, res: Response) {
      const id = Number(req.params.id);
      await EmpresaService.deleteEmpresa(id)
      res.status(200).json(new ApiSuccessResponse<null>(null,"Empresa eliminada con exito"));
  }
}

export const empresacontroller = new empresaController();