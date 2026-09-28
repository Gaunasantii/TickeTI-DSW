import { NotFoundError } from "../utils/base.error.js";
import { categoriaDAO } from "./categoria.DAO.js";

export class CategoriaService {
  static async createCategoria(categoriaInput: any) {
    return await categoriaDAO.createCategoria(categoriaInput);
  }

  static async getallCategorias() {
    return await categoriaDAO.findAll({});
  }

  static async updateCategoria(categoriainput: any, id: number) {
    const categoriafound = await categoriaDAO.findOne({id:id})
    if(!categoriafound)throw new NotFoundError("Categoria no encontrada",`Categoria de id ${id} no hallada`)
    return await categoriaDAO.updateCategoria(categoriainput,categoriafound)
  }

  static async deleteCategoria(id: Number) {
    const categoriafound = await categoriaDAO.findOne({id:id})
    if(!categoriafound)throw new NotFoundError("Categoria no encontrada",`Categoria de id ${id} no hallada`)
    await categoriaDAO.deleteCategoria(categoriafound);
  }
}