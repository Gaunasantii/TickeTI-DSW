import { type Request, type Response } from "express";
import { EstadoDAO } from "../DAO/estado.DAO.js";
import { EstadoDTO } from "../DTO/estado.dto.js";

class EstadoController {
  async createNew(req: Request, res: Response) {
    try {
      const estadoInput = req.body;
      const newEstado = await EstadoDAO.createState(estadoInput);
      
      const estadoDTO = new EstadoDTO(
        newEstado.nombre,
        newEstado.descripcion,
        newEstado.id
      );

      res.status(200).json({ message: "estado creado correctamente", data: estadoDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const recoveredEstados = await EstadoDAO.findAll({});
      
      const estadosDTO = recoveredEstados.map((estado: any) =>
        new EstadoDTO(
          estado.nombre,
          estado.descripcion,
          estado.id
        )
      );

      res.status(200).json({ message: "estados recuperados", data: estadosDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params
      const recoveredEstado = await EstadoDAO.findOne({ id: Number(id) });
      
      const estadoDTO = new EstadoDTO(
        recoveredEstado.nombre,
        recoveredEstado.descripcion,
        recoveredEstado.id
      );

      res.status(200).json({ message: "estado recuperado", data: estadoDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }

  }
}

export const estadoController = new EstadoController();