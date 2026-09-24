import { NotFoundError } from "../utils/base.error.js";
import { TecnicoDTO } from "./DTO/tecnico.dto.js";
import { tecnicoDAO } from "./tecnico.DAO.js";

export class TecnicoService {
  static async createTecnico(tecnicoInput: any) {
    const newTecnico = await tecnicoDAO.createTecnico(tecnicoInput);

    return new TecnicoDTO(
      newTecnico.dni,
      newTecnico.surName,
      newTecnico.name,
      newTecnico.tele,
      newTecnico.mail
    );
  }

  static async getAllTecnicos() {
    const tecnicosRecovered = await tecnicoDAO.findAll({ populate: ['asignaciones'] });

    return tecnicosRecovered.map((tecnico: any) =>
      new TecnicoDTO(
        tecnico.dni,
        tecnico.surName,
        tecnico.name,
        tecnico.tele,
        tecnico.mail
      )
    );
  }

  static async updateTecnico(dni: string, tecnicoInput: any) {
    const tecnicoFound = await tecnicoDAO.findOne({dni:dni})
    if(!tecnicoFound)throw new NotFoundError("Tecnico no encontrado",`Tecnico de dni ${dni} no encontrado`)
    const updatedTecnico = await tecnicoDAO.updateTecnico(tecnicoInput, tecnicoFound);

    return new TecnicoDTO(
      updatedTecnico.dni,
      updatedTecnico.surName,
      updatedTecnico.name,
      updatedTecnico.tele,
      updatedTecnico.mail
    );
  }

  static async deleteTecnico(dni: string) {
    const tecnicoFound = await tecnicoDAO.findOne({dni:dni})
    if(!tecnicoFound)throw new NotFoundError("Tecnico no encontrado",`Tecnico de dni ${dni} no encontrado`)
    await tecnicoDAO.deleteTecnico(tecnicoFound);
  }
}