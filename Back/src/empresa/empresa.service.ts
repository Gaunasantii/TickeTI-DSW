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
    const empresafound = await empresaDAO.updateEmpresa(empresaInput, { id: Number(id) });

    return new EmpresaDTO(
      empresafound.nombre,
      empresafound.id
    );
  }

  static async deleteEmpresa(id: number) {
    await empresaDAO.deleteEmpresa(id);
  }
}