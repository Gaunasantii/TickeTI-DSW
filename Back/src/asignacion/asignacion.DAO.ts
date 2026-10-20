import { orm } from "../config/DataBase/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { asignacionSchema } from "./asignacion.entity.js";

export class asignacionDAO {
  static async createAsignacion(asignacionInput: any) {
      const em = orm.em ;
      const newAsignacion = em.create(asignacionSchema, asignacionInput);
      em.persist(newAsignacion);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newAsignacion;
  }

  static async findAll(filters: any,options:any=null) {
      const em = orm.em ;
      const asignacionRecovered = await em.find(asignacionSchema, filters, options);
      return asignacionRecovered;
  }

  static async updateAsignacion(asignacionInput: any, asignacionFound: any) {
      const em = orm.em ;
      em.assign(asignacionFound, asignacionInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return asignacionFound;
  }

  static async deleteAsignacion(asignacionFound: any) {
      const em = orm.em ;
      em.remove(asignacionFound);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return asignacionFound;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const asignacionFound = await em.findOne(asignacionSchema, filters);
      return asignacionFound;
  }

  static async getPaginated(filters: any, page: number, pageSize: number,options:any) {
      const em = orm.em ;
      const [asignaciones, total] = await em.findAndCount(asignacionSchema, filters, {
          limit: pageSize,
          offset: (page - 1) * pageSize,
          ...options
      });
      return {asignaciones,total};
  }
}