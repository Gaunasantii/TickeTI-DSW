import { type Request, type Response } from "express";
import { tecnicoDAO } from "./tecnico.DAO.js";
import { TecnicoDTO } from "./DTO/tecnico.dto.js";
import { TecnicoService } from "./tecnico.service.js";

class tecnicoController {

  async createTecnico(req: Request, res: Response) {
    try {
      const tecnicoInput = req.body;
      const newTecnico = await TecnicoService.createTecnico(tecnicoInput);

      res.status(200).json({ message: "Tecnico creado", data: newTecnico });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const tecnicosRecovered = await TecnicoService.getAllTecnicos()

      res.status(200).json({ message: "Tecnicos Recuperados", data: tecnicosRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni as string;
      const tecnicoinput = req.body;
      const updatedTecnico = await TecnicoService.updateTecnico(dni, tecnicoinput)

      return res.status(200).json({
        message: "Tecnico actualizado",
        data: updatedTecnico
      });
    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  }

  async deleteTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni as string;
      await TecnicoService.deleteTecnico(dni)

      return res.status(204).json({
        message: "Tecnico eliminado",
      });
    } catch (error: any) {
      return res.status(404).json({
        error: error.message
      });
    }
  }
}
export const tecnicocontroller = new tecnicoController();