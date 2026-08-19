import { EstadoDAO } from "./estado.DAO.js";
import { EstadoDTO } from "./DTO/estado.dto.js";

export class EstadoService {
  static async createEstado(estadoInput: any) {
    const newEstado = await EstadoDAO.createState(estadoInput);

    return new EstadoDTO(
      newEstado.nombre,
      newEstado.descripcion,
      newEstado.id
    );
  }

  static async getEstadoById(id: Number) {
    const recoveredEstado = await EstadoDAO.findOne({ id: id });

    return new EstadoDTO(
      recoveredEstado.nombre,
      recoveredEstado.descripcion,
      recoveredEstado.id
    );
  }

  static async getAll() {
    const recoveredEstados = await EstadoDAO.findAll({});

    return recoveredEstados.map((estado: any) =>
      new EstadoDTO(
        estado.nombre,
        estado.descripcion,
        estado.id
      )
    );
  }
}