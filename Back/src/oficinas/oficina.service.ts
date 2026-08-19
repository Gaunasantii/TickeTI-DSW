import { OficinaDTO } from "./DTO/oficina.dto.js";
import { oficinaDAO } from "./oficina.DAO.js";

export class OficinaService {
  static async getAll() {
    const oficinas = await oficinaDAO.findAll({});
    return oficinas.map((o) => {
      new OficinaDTO(
        o.nombre,
        o.empresa?.id,
        o.id
      )
    })
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
    await oficinaDAO.deleteOficina(id);
  }

  static async updateOficina(id: number, oficinaInput: any) {
    const oficinafound = await oficinaDAO.updateOficina(oficinaInput, { id: id });

    return new OficinaDTO(
      oficinafound.nombre,
      oficinafound.empresa?.id,
      oficinafound.id
    );
  }
}