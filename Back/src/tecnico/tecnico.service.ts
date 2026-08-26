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
    const updatedTecnico = await tecnicoDAO.updateTecnico(tecnicoInput, { dni: dni });

    return new TecnicoDTO(
      updatedTecnico.dni,
      updatedTecnico.surName,
      updatedTecnico.name,
      updatedTecnico.tele,
      updatedTecnico.mail
    );
  }

  static async deleteTecnico(dni: string) {
    await tecnicoDAO.deleteTecnico(dni);
  }
}