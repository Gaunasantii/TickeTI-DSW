import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { PrioridadSchema } from "./prioridad.entity.js";

export class prioridadDAO {
  static async findAll(filters: any) {
    const em = orm.em.fork();
    const prioridadRecovered = await em.findAll(PrioridadSchema, filters);
    return prioridadRecovered;
  }

  static async findOne(filters: any) {
      const em = orm.em.fork();
      const prioridadFound = await em.findOne(PrioridadSchema, filters);
      return prioridadFound;
  }

  static async createPrioridad(prioridadInput: any) {
      const em = orm.em.fork();
      const newPrioridad = em.create(PrioridadSchema, prioridadInput);
      em.persist(newPrioridad);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newPrioridad;
  }

  static async updatePrioridad(prioridadInput: any, prioridadFound:any) {
      const em = orm.em.fork();
      em.assign(prioridadFound, prioridadInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return prioridadFound;
  }

  static async deletePrioridad(prioridadFound:any) {
      const em = orm.em.fork();
      em.remove(prioridadFound);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
  }
}