import { type Request, type Response } from "express";
import { oficinaDAO } from "./oficina.DAO.js";

class oficinaController {

  async createOficina(req: Request, res: Response) {
    try {
      const oficinaInput = req.body;
      const newOficina = await oficinaDAO.createOficina(oficinaInput);
      res.status(201).json({ message: "Oficina creado", data: newOficina });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const oficinaRecovered = await oficinaDAO.findAll({});
      res.status(200).json({ message: "Empresa Recuperadas", data: oficinaRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOficina(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oficinainput = req.body;

      const oficinafound = await oficinaDAO.findOne({ id: Number(id) });
      res.status(200).json({
        message: "Oficina actualizada",
        data: oficinafound
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

  async deleteOficina(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const oficinafound = await oficinaDAO.findOne({ id: Number(id) });

      await oficinaDAO.deleteOficina({ id: Number(id) });
      res.status(200).json({
        message: "Oficina eliminado",
        data: oficinafound
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }


}

export const oficinacontroller = new oficinaController();