import { type Request, type Response } from "express";
import { EstadoDAO } from "./estado.DAO.js";

class EstadoController {
  async createNew(req: Request, res: Response) {
    try {
      const estadoInput = req.body;
      const newEstado = await EstadoDAO.createState(estadoInput);
      res.status(200).json({ message: "estado creado correctamente", data: newEstado });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const recoveredEstados = await EstadoDAO.findAll({});

      res.status(200).json({ message: "estados recuperados", data: recoveredEstados });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params
      const recoveredEstado = await EstadoDAO.findOne({ id: Number(id) });

      res.status(200).json({ message: "estado recuperado", data: recoveredEstado });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }

  }
}

export const estadoController = new EstadoController();