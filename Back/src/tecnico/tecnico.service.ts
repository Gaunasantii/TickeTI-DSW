import type { EntityType } from "@mikro-orm/core";
import { NotFoundError } from "../utils/base.error.js";
import { tecnicoDAO } from "./tecnico.DAO.js";

export class TecnicoService {
  static async createTecnico(tecnicoInput: any) {
    return await tecnicoDAO.createTecnico(tecnicoInput);
  }

  static async getAllTecnicos() {
    return await tecnicoDAO.findAll({ });
  }

  static async updateTecnico(dni: string, tecnicoInput: any) {
    const tecnicoFound = await tecnicoDAO.findOne({dni:dni})
    if(!tecnicoFound)throw new NotFoundError("Tecnico no encontrado",`Tecnico de dni ${dni} no encontrado`)
    return await tecnicoDAO.updateTecnico(tecnicoInput, tecnicoFound);
  }

  static async deleteTecnico(dni: string) {
    const tecnicoFound = await tecnicoDAO.findOne({dni:dni})
    if(!tecnicoFound)throw new NotFoundError("Tecnico no encontrado",`Tecnico de dni ${dni} no encontrado`)
    await tecnicoDAO.deleteTecnico(tecnicoFound);
  }
}