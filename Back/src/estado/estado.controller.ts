import { type Request, type Response } from "express";
import { EstadoDAO } from "./estado.DAO.js";
import { EstadoDTO } from "./DTO/estado.dto.js";
import { EstadoService } from "./estado.service.js";

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
      const estados = await EstadoService.getAll()

      res.status(200).json({ message: "estados recuperados", data: estados });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params)
      const estado = await EstadoService.getEstadoById(id)
      res.status(200).json({ message: "estado recuperado", data: estado });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }

  }
}

export const estadoController = new EstadoController();