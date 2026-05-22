import { orm } from "../config/db.js";
import { CategoriaSchema } from "../models/categoria.entity.js";

export class empresaDAO {
  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const empresaRecovered = await em.findAll(CategoriaSchema, filters);
      return empresaRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const empresaFound = await em.findOneOrFail(CategoriaSchema, filters);
      return empresaFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createEmpresa(empresaInput: any) {
    try {
      const em = orm.em.fork();
      const newEmpresa = em.create(CategoriaSchema, empresaInput);
      em.persist(newEmpresa);
      await em.flush();
      return newEmpresa;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async updateEmpresa(empresaInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const empresaToUpdate = await em.findOneOrFail(CategoriaSchema, filters);
      em.assign(empresaToUpdate, empresaInput);
      await em.flush();
      return empresaToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteEmpresa(filters: any) {
    try {
      const em = orm.em.fork();
      const empresaToDelete = await em.findOneOrFail(CategoriaSchema, filters);
      em.remove(empresaToDelete);
      await em.flush();
      return empresaToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}