import { orm } from "../config/db.js";
import { CategoriaSchema } from "../models/categoria.entity.js";

export class categoriaDAO {
  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const categoriaRecovered = await em.findAll(CategoriaSchema, filters);
      return categoriaRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const categoriaFound = await em.findOneOrFail(CategoriaSchema, filters);
      return categoriaFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createCategoria(categoriaInput: any) {
    try {
      const em = orm.em.fork();
      const newCategoria = em.create(CategoriaSchema, categoriaInput);
      em.persist(newCategoria);
      await em.flush();
      return newCategoria;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async updateCategoria(categoriaInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const categoriaToUpdate = await em.findOneOrFail(CategoriaSchema, filters);
      em.assign(categoriaToUpdate, categoriaInput);
      await em.flush();
      return categoriaToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteCategoria(filters: any) {
    try {
      const em = orm.em.fork();
      const categoriaToDelete = await em.findOneOrFail(CategoriaSchema, filters);
      em.remove(categoriaToDelete);
      await em.flush();
      return categoriaToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}