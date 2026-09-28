import { NotFoundError } from "../utils/base.error.js";
import { prioridadDAO } from "./prioridad.DAO.js";

export class PrioridadService {
  static async createPrioridad(prioridadInput: any) {
    return await prioridadDAO.createPrioridad(prioridadInput)
  }

  static async getallPrioridades() {
    return await prioridadDAO.findAll({});
  }

  static async updatePrioridad(prioridadInput: any, id: number) {
    const prioridadFound=await prioridadDAO.findOne({id:id})
    if(!prioridadFound)throw new NotFoundError("Prioridad no encontrada",`prioridad con id ${id} no hallada`)
    return await prioridadDAO.updatePrioridad(prioridadInput,prioridadFound)
  }

  static async deletePrioridad(id: number) {
    const prioridadFound=await prioridadDAO.findOne({id:id})
    if(!prioridadFound)throw new NotFoundError("Prioridad no encontrada",`prioridad con id ${id} no hallada`)
    await prioridadDAO.deletePrioridad(prioridadFound);
  }
}