import { NotFoundError } from "../utils/base.error.js";
import { OficinaDTO } from "./DTO/oficina.dto.js";
import { oficinaDAO } from "./oficina.DAO.js";

export class OficinaService {
  static async getAll() {
    const oficinas = await oficinaDAO.findAll({});
    return oficinas.map((o) =>
      new OficinaDTO(
        o.nombre,
        o.empresa?.id,
        o.id
      )
    )
  }

  static async createOficina(oficinaInput: any) {
    const newOficina = await oficinaDAO.createOficina(oficinaInput);
    return new OficinaDTO(
      newOficina.nombre,
      newOficina.empresa?.id,
      newOficina.id
    )
  }

  static async deleteOficina(id: number) {
    const oficinaFound=await oficinaDAO.findOne({id:id})
    if(!oficinaFound)throw new NotFoundError("Oficina no encontrada",`Oficina con id ${id} no encontrada`)
    await oficinaDAO.deleteOficina(oficinaFound);
  }

  static async updateOficina(id: number, oficinaInput: any) {
    const oficinafound = await oficinaDAO.findOne({id:id})
     if(!oficinafound)throw new NotFoundError("Oficina no encontrada",`Oficina con id ${id} no encontrada`)
    const oficinaUpdated=await oficinaDAO.updateOficina(oficinaInput,oficinafound)

    return new OficinaDTO(
      oficinaUpdated.nombre,
      oficinaUpdated.empresa?.id,
      oficinaUpdated.id
    );
  }
}