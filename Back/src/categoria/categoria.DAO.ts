import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { CategoriaSchema } from "./categoria.entity.js";

export class categoriaDAO {
  static async findAll(filters: any) {
      const em = orm.em ;
      const categoriaRecovered = await em.findAll(CategoriaSchema, filters);
      return categoriaRecovered;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const categoriaFound = await em.findOne(CategoriaSchema, filters);
      return categoriaFound;
  }

  static async createCategoria(categoriaInput: any) {
      const em = orm.em ;
      const newCategoria = em.create(CategoriaSchema, categoriaInput);
      em.persist(newCategoria);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newCategoria;
  }

  static async updateCategoria(categoriaInput: any, categoriaFound:any) {
      const em = orm.em ;
      em.assign(categoriaFound, categoriaInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return categoriaFound
  }

  static async deleteCategoria(categoriaFound:any) {
      const em = orm.em ;
      em.remove(categoriaFound)
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
  }
}