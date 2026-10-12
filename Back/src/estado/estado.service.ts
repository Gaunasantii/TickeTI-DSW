import { EstadoDAO } from "./estado.DAO.js";
import { NotFoundError } from "../utils/base.error.js";

export class EstadoService {
  static async createEstado(estadoInput: any) {
    return await EstadoDAO.createState(estadoInput);
  }

  static async getEstadoById(id: Number) {
    const recoveredEstado = await EstadoDAO.findOne({ id: id });
    if (!recoveredEstado) {
      throw new NotFoundError("Estado no encontrado",`Estado con id ${id} no encontrado`);
    }
    return recoveredEstado;
  }

  static async getAll() {
    return await EstadoDAO.findAll({});
  }

  static async getEstadosPaginated( page: number, limit: number) {
    return await EstadoDAO.getEstadosPaginated({}, page, limit);
  }

  static async deleteEstado(id: Number) {
    const estadoToBeDeleted = await EstadoDAO.findOne({ id: id });
    if (!estadoToBeDeleted) {
      throw new NotFoundError("Estado no encontrado",`Estado con id ${id} no encontrado`);
    }
    if(estadoToBeDeleted.esEstadoInicial) 
      throw new Error("No se puede eliminar el estado inicial");
    
    if(estadoToBeDeleted.esEstadoFinal)
      throw new Error("No se puede eliminar el estado final");

    return await EstadoDAO.delete(estadoToBeDeleted);
  }

  static async updateEstado(id: Number, estadoInput: any) {
    const estadoToBeUpdated = await EstadoDAO.findOne({ id: id });
    if (!estadoToBeUpdated) {
      throw new NotFoundError("Estado no encontrado",`Estado con id ${id} no encontrado`);
    }
    return await EstadoDAO.updateState(estadoInput, estadoToBeUpdated);
  }
}