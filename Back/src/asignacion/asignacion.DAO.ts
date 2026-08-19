import { orm } from "../config/db.js";
import { asignacionSchema } from "./asignacion.entity.js";

export class asignacionDAO {
  static async createAsignacion(asignacionInput: any) {
    try {
      const em = orm.em.fork();
      const newAsignacion = em.create(asignacionSchema, asignacionInput);
      em.persist(newAsignacion);
      await em.flush();
      return newAsignacion;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const asignacionRecovered = await em.findAll(asignacionSchema, filters);
      return asignacionRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateAsignacion(asignacionInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const asignacionFound = await em.findOneOrFail(asignacionSchema, filters);
      em.assign(asignacionFound, asignacionInput);
      await em.flush();
      return asignacionFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteAsignacion(filters: any) {
    try {
      const em = orm.em.fork();
      const asignacionFound = await em.findOneOrFail(asignacionSchema, filters);
      em.remove(asignacionFound);
      await em.flush();
      return asignacionFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const asignacionFound = await em.findOneOrFail(asignacionSchema, filters);
      return asignacionFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}