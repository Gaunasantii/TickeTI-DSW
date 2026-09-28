import { NotFoundError } from "../utils/base.error.js";
import { empresaDAO } from "./empresa.DAO.js";

export class EmpresaService {
  static async createEmpresa(empresaInput: any) {
    return await empresaDAO.createEmpresa(empresaInput);
  }

  static async getAllEmpresas() {
    return await empresaDAO.findAll({});
  }

  static async updateEmpresa(id: number, empresaInput: any) {
    const empresafound = await empresaDAO.findOne({id:id});
    if(!empresafound)throw new NotFoundError("Empresa no encontrada",`Empresa de id ${id} no encontrado`)
    return await empresaDAO.updateEmpresa(empresaInput,empresafound);
  }

  static async deleteEmpresa(id: number) {
    const empresafound = await empresaDAO.findOne({id:id});
    if(!empresafound)throw new NotFoundError("Empresa no encontrada",`Empresa de id ${id} no encontrado`)
    await empresaDAO.deleteEmpresa(empresafound);
  }
}