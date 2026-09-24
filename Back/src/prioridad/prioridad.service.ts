import { NotFoundError } from "../utils/base.error.js";
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
    const prioridadFound=await prioridadDAO.findOne({id:id})
    if(!prioridadFound)throw new NotFoundError("Prioridad no encontrada",`prioridad con id ${id} no hallada`)
    const prioridadUpdated= await prioridadDAO.updatePrioridad(prioridadInput,prioridadFound)

    return new PrioridadDTO(
      prioridadUpdated.nombre,
      prioridadUpdated.tiempoLimiteResolucion,
      prioridadUpdated.id
    );
  }

  static async deletePrioridad(id: number) {
    const prioridadFound=await prioridadDAO.findOne({id:id})
    if(!prioridadFound)throw new NotFoundError("Prioridad no encontrada",`prioridad con id ${id} no hallada`)
    await prioridadDAO.deletePrioridad(prioridadFound);
  }
}