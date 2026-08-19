import { type Request, type Response } from "express";
import { empresaDAO } from "./empresa.DAO.js";
import { EmpresaDTO } from "./DTO/empresa.dto.js";

class empresaController {

  async createEmpresa(req: Request, res: Response) {
    try {
      const empresaInput = req.body;
      const newEmpresa = await empresaDAO.createEmpresa(empresaInput);

      const empresaDTO = new EmpresaDTO(
        newEmpresa.nombre,
        newEmpresa.id
      );

      res.status(201).json({ message: "Empresa creada", data: empresaDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const empresaRecovered = await empresaDAO.findAll({});
      
      const empresasDTO = empresaRecovered.map((empresa: any) =>
        new EmpresaDTO(
          empresa.nombre,
          empresa.id
        )
      );
      
      res.status(200).json({ message: "Empresa Recuperadas", data: empresasDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const empresainput = req.body;

      const empresafound = await empresaDAO.updateEmpresa(empresainput, { id: Number(id) });

      const empresaDTO = new EmpresaDTO(
        empresafound.nombre,
        empresafound.id
      );

      res.status(200).json({
        message: "Empresa actualizada",
        data: empresaDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const empresafound = await empresaDAO.deleteEmpresa({ id: Number(id) });

      const empresaDTO = new EmpresaDTO(
        empresafound.nombre,
        empresafound.id
      );

      res.status(200).json({
        message: "Empresa eliminado",
        data: empresaDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }
}

export const empresacontroller = new empresaController();