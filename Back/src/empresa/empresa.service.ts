import { populate } from "dotenv";
import { NotFoundError } from "../utils/base.error.js";
import { empresaDAO } from "./empresa.DAO.js";
import { EstadoDAO } from "../estado/estado.DAO.js";
import { prioridadDAO } from "../prioridad/prioridad.DAO.js";
import { categoriaDAO } from "../categoria/categoria.DAO.js";
import type { CreateEmpresaInDto } from "./DTO/CreateEmpresa.dto.js";
import { adminDAO } from "../admin/admin.DAO.js";
import type { ModifyEmpresaSchemaInBodyDto } from "./DTO/ModifyEmpresa.dto.js";
export class EmpresaService {
  static async createEmpresa(empresaInput: CreateEmpresaInDto) {

    const empresa=await empresaDAO.createEmpresa(empresaInput);

    Promise.all([
      EstadoDAO.createInitialStates(empresa.id),
      prioridadDAO.createInitialPrioridades(empresa.id),
      categoriaDAO.createInitialCategorias(empresa.id)
    ]);

    if(empresaInput.admin){
        var admin={...empresaInput.admin,empresaId:empresa.id}
        await adminDAO.createAdmin(admin);
    }

    return empresa;
  }

  static async getAllEmpresas() {
    return await empresaDAO.findAll({});
  }

  static async updateEmpresa(id: number, empresaInput: ModifyEmpresaSchemaInBodyDto) {

    const empresafound = await empresaDAO.findOne({id:id});
    
    if(!empresafound)throw new NotFoundError("Empresa no encontrada",`Empresa de id ${id} no encontrado`)
    
    const adminFound = await adminDAO.findOne({empresa: id});  

    const adminData = {...empresaInput.admin, empresa: empresafound.id};

    if(!empresaInput.admin) return await empresaDAO.updateEmpresa({nombre: empresaInput.nombre}, empresafound);
    
    if (!adminFound) {
      await adminDAO.createAdmin(adminData);
    } else if (adminFound.dni === empresaInput.admin.dni) {
      await adminDAO.updateAdmin(adminData, adminFound);
    } else {
      await adminDAO.deleteAdmin(adminFound);
      await adminDAO.createAdmin(adminData);
    }
    
    return await empresaDAO.updateEmpresa({nombre: empresaInput.nombre}, empresafound);
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