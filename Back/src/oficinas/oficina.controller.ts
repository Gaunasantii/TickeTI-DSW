import { type Request, type Response } from "express";
import { oficinaDAO } from "./oficina.DAO.js";
import { OficinaDTO } from "./DTO/oficina.dto.js";
import { OficinaService } from "./oficina.service.js";

class oficinaController {

  async createOficina(req: Request, res: Response) {
    try {
      const oficinaInput = req.body;
      const newOficina = await OficinaService.createOficina(oficinaInput)

      res.status(201).json({ message: "Oficina creado", data: newOficina });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const oficinas = await OficinaService.getAll();

      res.status(200).json({ message: "Empresa Recuperadas", data: oficinas })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOficina(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const oficinainput = req.body;
      const updatedOficina = await OficinaService.updateOficina(id, oficinainput);

      res.status(200).json({
        message: "Oficina actualizada",
        data: updatedOficina
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }

  async deleteOficina(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await OficinaService.deleteOficina(id)
      res.status(204).json({
        message: "Oficina eliminado",
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }


}

export const oficinacontroller = new oficinaController();