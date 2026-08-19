import { type Request, type Response } from "express";
import { empresaDAO } from "./empresa.DAO.js";
import { EmpresaDTO } from "./DTO/empresa.dto.js";
import { EmpresaService } from "./empresa.service.js";

class empresaController {

  async createEmpresa(req: Request, res: Response) {
    try {
      const empresaInput = req.body;
      const newEmpresa = EmpresaService.createEmpresa(empresaInput)

      res.status(200).json({ message: "Empresa creada", data: newEmpresa });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const empresas = await EmpresaService.getAllEmpresas()
      res.status(200).json({ message: "Empresa Recuperadas", data: empresas })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const empresainput = req.body;
      const updatedEmpresa = await EmpresaService.updateEmpresa(id, empresainput)
      res.status(200).json({
        message: "Empresa actualizada",
        data: updatedEmpresa
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await EmpresaService.deleteEmpresa(id)
      res.status(204).json({
        message: "Empresa eliminado",
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }
}

export const empresacontroller = new empresaController();