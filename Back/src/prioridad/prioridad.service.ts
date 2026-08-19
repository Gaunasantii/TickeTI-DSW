import { PrioridadDTO } from "./DTO/prioridad.dto.js";
import { prioridadDAO } from "./prioridad.DAO.js";

export class PrioridadService {
  static async createPrioridad(prioridadInput: any) {
    const newPrioridad = await prioridadDAO.createPrioridad(prioridadInput);

    return new PrioridadDTO(
      newPrioridad.nombre,
      newPrioridad.tiempoLimiteResolucion,
      newPrioridad.id
    );
  }

  static async getallPrioridades() {
    const prioridadRecovered = await prioridadDAO.findAll({});

    return prioridadRecovered.map((prioridad: any) =>
      new PrioridadDTO(
        prioridad.nombre,
        prioridad.tiempoLimiteResolucion,
        prioridad.id
      )
    );
  }

  static async updatePrioridad(prioridadInput: any, id: number) {
    const prioridadUpdated = await prioridadDAO.updatePrioridad(prioridadInput, { id: id });

    return new PrioridadDTO(
      prioridadUpdated.nombre,
      prioridadUpdated.tiempoLimiteResolucion,
      prioridadUpdated.id
    );
  }

  static async deletePrioridad(id: number) {
    await prioridadDAO.deletePrioridad(id);
  }
}