import { NotFoundError } from "../utils/base.error.js";
import { CategoriaDTO } from "./DTO/categoria.dto.js";
import { categoriaDAO } from "./categoria.DAO.js";

export class CategoriaService {
  static async createCategoria(categoriaInput: any) {
    const newCategoria = await categoriaDAO.createCategoria(categoriaInput);

    return new CategoriaDTO(
      newCategoria.nombre,
      newCategoria.id
    );
  }

  static async getallCategorias() {
    const categoriasRecovered = await categoriaDAO.findAll({});

    return categoriasRecovered.map((categoria: any) =>
      new CategoriaDTO(
        categoria.nombre,
        categoria.id
      )
    );
  }

  static async updateCategoria(categoriainput: any, id: number) {
    const categoriafound = await categoriaDAO.findOne({id:id})
    if(!categoriafound)throw new NotFoundError("Categoria no encontrada",`Categoria de id ${id} no hallada`)
    const categoriaUpdated= await categoriaDAO.updateCategoria(categoriainput,categoriafound)

    return new CategoriaDTO(
      categoriaUpdated.nombre,
      categoriaUpdated.id
    );
  }

  static async deleteCategoria(id: Number) {
    const categoriafound = await categoriaDAO.findOne({id:id})
    if(!categoriafound)throw new NotFoundError("Categoria no encontrada",`Categoria de id ${id} no hallada`)
    await categoriaDAO.deleteCategoria(categoriafound);
  }
}