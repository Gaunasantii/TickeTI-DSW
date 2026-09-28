import { asignacionDAO } from "./asignacion.DAO.js";
import { NotFoundError } from "../utils/base.error.js";
export class AsignacionService {
  static async createAsignacion(asignacionInput: any) {
    await asignacionDAO.createAsignacion(asignacionInput);
  }

  static async getAllAsignaciones() {
    return await asignacionDAO.findAll({})
  }

  static async changeStateAsignacion(id: number, asignacionInput: any) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    return await asignacionDAO.updateAsignacion(asignacionInput, asignacionFound);
  }

  static async deleteAsignacion(id: number) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    await asignacionDAO.deleteAsignacion(asignacionFound);
  }
}