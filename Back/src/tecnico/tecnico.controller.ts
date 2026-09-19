import { type Request, type Response } from "express";
import { tecnicoDAO } from "./tecnico.DAO.js";
import { TecnicoDTO } from "./DTO/tecnico.dto.js";
import { TecnicoService } from "./tecnico.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class tecnicoController {

  async createTecnico(req: Request, res: Response) {
      const tecnicoInput = req.body;
      await TecnicoService.createTecnico(tecnicoInput);

      res.status(201).json(new ApiSuccessResponse<null>(null,"Tecnico creado con exito"));
  };

  async findAll(req: Request, res: Response) {
      const tecnicosRecovered = await TecnicoService.getAllTecnicos()
      res.status(200).json(new ApiSuccessResponse<TecnicoDTO[]>(tecnicosRecovered,"Tecnicos recuperados con exito"))
  }

  async updateTecnico(req: Request, res: Response) {
    
      const dni = req.params.dni as string;
      const tecnicoinput = req.body;
      const updatedTecnico = await TecnicoService.updateTecnico(dni, tecnicoinput)

      return res.status(200).json(new ApiSuccessResponse<null>(null,"Tecnico actualizado con exitos"));
  }

  async deleteTecnico(req: Request, res: Response) {
      const dni = req.params.dni as string;
      await TecnicoService.deleteTecnico(dni)
      return res.status(200).json(new ApiSuccessResponse<null>(null,"Tecnico eliminado con exito"));
  }
}
export const tecnicocontroller = new tecnicoController();