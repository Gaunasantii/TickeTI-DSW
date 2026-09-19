import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { OficinaSchema } from "./oficina.entity.js";

export class oficinaDAO {
  static async createOficina(oficinaInput: any) {
      const em = orm.em ;
      const newOficina = em.create(OficinaSchema, oficinaInput)
      em.persist(newOficina);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newOficina;
  }


  static async findAll(filters: any) {
      const em = orm.em ;
      const oficinaRecovered = await em.findAll(OficinaSchema, filters);
      return oficinaRecovered;
  }

  static async updateOficina(oficinaInput: any, oficinaToUpdate:any) {
      const em = orm.em ;
      em.assign(oficinaToUpdate, oficinaInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return oficinaToUpdate;
  }

  static async deleteOficina(oficinaToDelete:any) {
      const em = orm.em ;
      em.remove(oficinaToDelete);
      await em.flush().catch((error)=>mapDbErrorToAppError(error));
      return oficinaToDelete;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const oficinaFound = await em.findOne(OficinaSchema, filters);
      return oficinaFound;
  }
}