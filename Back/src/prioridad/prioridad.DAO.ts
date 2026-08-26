import { orm } from "../config/db.js";
import { PrioridadSchema } from "./prioridad.entity.js";

export class prioridadDAO {
  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const prioridadRecovered = await em.findAll(PrioridadSchema, filters);
      return prioridadRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const prioridadFound = await em.findOneOrFail(PrioridadSchema, filters);
      return prioridadFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createPrioridad(prioridadInput: any) {
    try {
      const em = orm.em.fork();
      const newPrioridad = em.create(PrioridadSchema, prioridadInput);
      em.persist(newPrioridad);
      await em.flush();
      return newPrioridad;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updatePrioridad(prioridadInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const prioridadToUpdate = await em.findOneOrFail(PrioridadSchema, filters);
      em.assign(prioridadToUpdate, prioridadInput);
      await em.flush();
      return prioridadToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deletePrioridad(filters: any) {
    try {
      const em = orm.em.fork();
      const prioridadToDelete = await em.findOneOrFail(PrioridadSchema, filters);
      em.remove(prioridadToDelete);
      await em.flush();
      return prioridadToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}