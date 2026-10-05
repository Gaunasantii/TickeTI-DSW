import { type Request, type Response } from "express";
import { TecnicoService } from "./tecnico.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import { TecnicoOutSchema, type TecnicoOutDto } from "./DTO/TecnicoOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { CreateTecnicoInDto } from "./DTO/CreateTecnico.dto.js";
import type { ModifyTecnicoBodyDTO, ModifyTecnicoParamsDTO } from "./DTO/ModifyTecnico.dto.js";

class tecnicoController {

  async createTecnico(req: Request<any,any,CreateTecnicoInDto>, res: Response) {
      const tecnicoInput = {...req.body,empresa:req.user.empresa};
      await TecnicoService.createTecnico(tecnicoInput);

      res.status(201).json(new ApiSuccessResponse<null>(null,"Tecnico creado con exito"));
  };

  async findAll(req: Request, res: Response) {
      const tecnicosRecovered = await TecnicoService.getAllTecnicos();
      const tecnicosDto=tecnicosRecovered.map(t=>TecnicoOutSchema.parse(wrap(t).toJSON()));
      res.status(200).json(new ApiSuccessResponse<TecnicoOutDto[]>(tecnicosDto,"Tecnicos recuperados con exito"))
  }

  async updateTecnico(req: Request<ModifyTecnicoParamsDTO,any,ModifyTecnicoBodyDTO>, res: Response) {
    
      const dni = req.params.dni as string;
      const tecnicoinput = req.body;
      await TecnicoService.updateTecnico(dni, tecnicoinput)

      return res.status(200).json(new ApiSuccessResponse<null>(null,"Tecnico actualizado con exitos"));
  }

  async deleteTecnico(req: Request<ModifyTecnicoParamsDTO,any,any>, res: Response) {
      const dni = req.params.dni as string;
      await TecnicoService.deleteTecnico(dni)
      return res.status(200).json(new ApiSuccessResponse<null>(null,"Tecnico eliminado con exito"));
  }
}
export const tecnicocontroller = new tecnicoController();