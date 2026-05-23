import { orm } from "../config/db.js";
import { OficinaSchema } from "../models/oficina.entity.js";

export class oficinaDAO {
  static async createOficina(oficinaInput: any) {
    try {
      const em = orm.em.fork();
      const newOficina = em.create(OficinaSchema, oficinaInput);
      em.persist(newOficina);
      await em.flush();
      return newOficina;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const oficinaRecovered = await em.findAll(OficinaSchema, filters);
      return oficinaRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateOficina(oficinaInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const oficinaToUpdate = await em.findOneOrFail(OficinaSchema, filters);
      em.assign(oficinaToUpdate, oficinaInput);
      await em.flush();
      return oficinaToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteOficina(filters: any) {
    try {
      const em = orm.em.fork();
      const oficinaToDelete = await em.findOneOrFail(OficinaSchema, filters);
      em.remove(oficinaToDelete);
      await em.flush();
      return oficinaToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const oficinaFound = await em.findOneOrFail(OficinaSchema, filters);
      return oficinaFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}