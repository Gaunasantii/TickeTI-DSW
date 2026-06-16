import { orm } from "../config/db.js";
import { TecnicoSchema } from "../models/tecnico.entity.js";

export class tecnicoDAO {
  static async createTecnico(tecnicoInput: any) {
    try {
      const em = orm.em.fork();
      const newTecnico = em.create(TecnicoSchema, tecnicoInput);
      em.persist(newTecnico);
      await em.flush();
      return newTecnico;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const tecnicoRecovered = await em.findAll(TecnicoSchema, filters);
      return tecnicoRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateTecnico(tecnicoInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const tecnicoToUpdate = await em.findOneOrFail(TecnicoSchema, filters);
      em.assign(tecnicoToUpdate, tecnicoInput);
      await em.flush();
      return tecnicoToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteTecnico(filters: any) {
    try {
      const em = orm.em.fork();
      const tecnicoToDelete = await em.findOneOrFail(TecnicoSchema, filters);
      em.remove(tecnicoToDelete);
      await em.flush();
      return tecnicoToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const tecnicoFound = await em.findOneOrFail(TecnicoSchema, filters);
      return tecnicoFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}