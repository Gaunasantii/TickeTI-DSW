import { type Request, type Response } from "express";
import { tecnicoDAO } from "../DAO/tecnico.DAO.js";
import { TecnicoDTO } from "../DTO/tecnico.dto.js";

class tecnicoController {

  async createTecnico(req: Request, res: Response) {
    try {
      const tecnicoInput = req.body;
      const newTecnico = await tecnicoDAO.createTecnico(tecnicoInput);
      
      const tecnicoDTO = new TecnicoDTO(
        newTecnico.dni,
        newTecnico.surName,
        newTecnico.name,
        newTecnico.tele,
        newTecnico.mail
      );

      res.status(201).json({ message: "Tecnico creado", data: tecnicoDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const tecnicosRecovered = await tecnicoDAO.findAll({ populate: ['asignaciones'] });
      
      const tecnicosDTO = tecnicosRecovered.map((tecnico: any) =>
        new TecnicoDTO(
          tecnico.dni,
          tecnico.surName,
          tecnico.name,
          tecnico.tele,
          tecnico.mail
        )
      );

      res.status(200).json({ message: "Tecnicos Recuperados", data: tecnicosDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni;
      const tecnicoinput = req.body;
      const updatedTecnico = await tecnicoDAO.updateTecnico(tecnicoinput, { dni: dni as string });

      const tecnicoDTO = new TecnicoDTO(
        updatedTecnico.dni,
        updatedTecnico.surName,
        updatedTecnico.name,
        updatedTecnico.tele,
        updatedTecnico.mail
      );

      return res.status(200).json({
        message: "Tecnico actualizado",
        data: tecnicoDTO
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message
      });
    }
  }

  async deleteTecnico(req: Request, res: Response) {
    try {
      const dni = req.params.dni;
      const deletedTecnico = await tecnicoDAO.deleteTecnico({ dni: dni as string });
      
      const tecnicoDTO = new TecnicoDTO(
        deletedTecnico.dni,
        deletedTecnico.surName,
        deletedTecnico.name,
        deletedTecnico.tele,
        deletedTecnico.mail
      );

      return res.status(200).json({
        message: "Tecnico eliminado",
        data: tecnicoDTO
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
}
export const tecnicocontroller = new tecnicoController();