import { NotFoundError } from "../utils/base.error.js";
import { EmpresaDTO } from "./DTO/empresa.dto.js";
import { empresaDAO } from "./empresa.DAO.js";

export class EmpresaService {
  static async createEmpresa(empresaInput: any) {
    const newEmpresa = await empresaDAO.createEmpresa(empresaInput);

    return new EmpresaDTO(
      newEmpresa.nombre,
      newEmpresa.id
    );
  }

  static async getAllEmpresas() {
    const empresas = await empresaDAO.findAll({});
    return empresas.map((e) =>
      new EmpresaDTO(
        e.nombre,
        e.id
      )
    )
  }

  static async updateEmpresa(id: number, empresaInput: any) {
    const empresafound = await empresaDAO.findOne({id:id});
    if(!empresafound)throw new NotFoundError("Empresa no encontrada",`Empresa de id ${id} no encontrado`)
    const empresaUpdated= await empresaDAO.updateEmpresa(empresaInput,empresafound);

    return new EmpresaDTO(
      empresaUpdated.nombre,
      empresaUpdated.id
    );
  }

  static async deleteEmpresa(id: number) {
    const empresafound = await empresaDAO.findOne({id:id});
    if(!empresafound)throw new NotFoundError("Empresa no encontrada",`Empresa de id ${id} no encontrado`)
    await empresaDAO.deleteEmpresa(empresafound);
  }
}