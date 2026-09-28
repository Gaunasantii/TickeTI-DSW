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
}