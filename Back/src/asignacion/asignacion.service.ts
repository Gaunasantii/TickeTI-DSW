import { asignacionDAO } from "./asignacion.DAO.js";
import { AsignacionDTO } from "./DTO/asignacion.dto.js";
import { NotFoundError } from "../utils/base.error.js";
export class AsignacionService {
  static async createAsignacion(asignacionInput: any) {
    const newAsignacion = await asignacionDAO.createAsignacion(asignacionInput);

    return new AsignacionDTO(
      newAsignacion.fechaCreacion,
      newAsignacion.estado,
      newAsignacion.ticket.id,
      newAsignacion.tecnico.dni,
      newAsignacion.id,
      newAsignacion.fechaCierre
    );
  }

  static async getAllAsignaciones() {
    const asignaciones = await asignacionDAO.findAll({})

    return asignaciones.map((as) =>
      new AsignacionDTO(
        as.fechaCreacion,
        as.estado,
        as.ticket.id,
        as.tecnico.dni,
        as.id,
        as.fechaCierre
      )
    )
  }

  static async updateAsignacion(id: number, asignacionInput: any) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    const updatedAsignacion = await asignacionDAO.updateAsignacion(asignacionInput, asignacionFound);

    return new AsignacionDTO(
      asignacionFound.fechaCreacion,
      asignacionFound.estado,
      asignacionFound.ticket.id,
      asignacionFound.tecnico.dni,
      asignacionFound.id,
      asignacionFound.fechaCierre,
    );
  }

  static async deleteAsignacion(id: number) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    await asignacionDAO.deleteAsignacion(asignacionFound);
  }
}