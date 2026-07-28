import { type Request, type Response } from "express";
import { oficinaDAO } from "../DAO/oficina.DAO.js";
import { OficinaDTO } from "../DTO/oficina.dto.js";

class oficinaController {

  async createOficina(req: Request, res: Response) {
    try {
      const oficinaInput = req.body;
      const newOficina = await oficinaDAO.createOficina(oficinaInput);
      
      const oficinaDTO = new OficinaDTO(
        newOficina.nombre,
        newOficina.empresa?.id,
        newOficina.id
      );
      
      res.status(201).json({ message: "Oficina creado", data: oficinaDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const oficinaRecovered = await oficinaDAO.findAll({});
      
      const oficinasDTO = oficinaRecovered.map((oficina: any) =>
        new OficinaDTO(
          oficina.nombre,
          oficina.empresa?.id,
          oficina.id
        )
      );

      res.status(200).json({ message: "Empresa Recuperadas", data: OficinaDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOficina(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oficinainput = req.body;

      const oficinafound = await oficinaDAO.findOne({ id: Number(id) });
      
      const oficinaDTO = new OficinaDTO(
        oficinafound.nombre,
        oficinafound.empresa?.id,
        oficinafound.id
      );

      res.status(200).json({
        message: "Oficina actualizada",
        data: oficinaDTO
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
      
      const oficinaDTO = new OficinaDTO(
        oficinafound.nombre,
        oficinafound.empresa?.id,
        oficinafound.id
      );

      res.status(200).json({
        message: "Oficina eliminado",
        data: oficinaDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }


}

export const oficinacontroller = new oficinaController();