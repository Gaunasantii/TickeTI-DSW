import { populate } from "dotenv";
import { NotFoundError } from "../utils/base.error.js";
import { empresaDAO } from "./empresa.DAO.js";
import { EstadoDAO } from "../estado/estado.DAO.js";

export class EmpresaService {
  static async createEmpresa(empresaInput: any) {
    const empresa=await empresaDAO.createEmpresa(empresaInput);
    await EstadoDAO.createInitialStates(empresa.id);
    return empresa;
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

  static async getPaginated(page:number,limit:number){
    return await empresaDAO.paginated(page,limit,{},{populate:['personas','admin']});
  }
}