import { type Request, type Response } from "express";
import { empresaDAO } from "../DAO/empresa.DAO.js";

class empresaController {

  async createEmpresa(req: Request, res: Response) {
    try {
      const empresaInput = req.body;
      const newEmpresa = await empresaDAO.createEmpresa(empresaInput);
      res.status(201).json({ message: "Empresa creada", data: newEmpresa });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const empresaRecovered = await empresaDAO.findAll({});
      res.status(200).json({ message: "Empresa Recuperadas", data: empresaRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const empresainput = req.body;

      const empresafound = await empresaDAO.updateEmpresa(empresainput, { id: Number(id) });

      res.status(200).json({
        message: "Empresa actualizada",
        data: empresafound
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

      res.status(200).json({
        message: "Empresa eliminado",
        data: empresafound
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }
}

export const empresacontroller = new empresaController();