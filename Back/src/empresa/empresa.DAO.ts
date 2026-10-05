import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { EmpresaSchema } from "./empresa.entity.js";

export class empresaDAO {
  static async findAll(filters: any) {
      const em = orm.em ;
      const empresaRecovered = await em.findAll(EmpresaSchema, filters);
      return empresaRecovered;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const empresaFound = await em.findOne(EmpresaSchema, filters);
      return empresaFound;
  }

  static async createEmpresa(empresaInput: any) {
      const em = orm.em ;
      const newEmpresa = em.create(EmpresaSchema, empresaInput);
      em.persist(newEmpresa);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newEmpresa;
  }
  static async updateEmpresa(empresaInput: any, empresaFound:any) {
      const em = orm.em ;
      em.assign(empresaFound, empresaInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return empresaFound;
  }

  static async deleteEmpresa(empresaFound:any) {
      const em = orm.em ;
      em.remove(empresaFound);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return empresaFound;
  }
}