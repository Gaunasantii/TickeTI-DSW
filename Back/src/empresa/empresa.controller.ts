import { type Request, type Response } from "express";
import { empresaDAO } from "./empresa.DAO.js";
import { EmpresaDTO } from "./DTO/empresa.dto.js";
import { EmpresaService } from "./empresa.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class empresaController {

  async createEmpresa(req: Request, res: Response) {
      const empresaInput = req.body;
      EmpresaService.createEmpresa(empresaInput)
      res.status(201).json(new ApiSuccessResponse<null>(null,"Empresa creada con exito"));
  };

  async findAll(req: Request, res: Response) {
      const empresas = await EmpresaService.getAllEmpresas()
      res.status(200).json(new ApiSuccessResponse<EmpresaDTO[]>(empresas,"Empresas recuperadas con exito"))
  }

  async updateEmpresa(req: Request, res: Response) {
      const id = Number(req.params.id);
      const empresainput = req.body;
      const updatedEmpresa = await EmpresaService.updateEmpresa(id, empresainput)
      res.status(200).json(new ApiSuccessResponse<EmpresaDTO>(updatedEmpresa,"Empresa actualizada con exito"));
  }

  async deleteEmpresa(req: Request, res: Response) {
      const id = Number(req.params.id);
      await EmpresaService.deleteEmpresa(id)
      res.status(200).json(new ApiSuccessResponse<null>(null,"Empresa eliminada con exito"));
  }
}

export const empresacontroller = new empresaController();