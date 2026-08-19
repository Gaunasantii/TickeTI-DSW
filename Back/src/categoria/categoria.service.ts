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
    const categoriafound = await categoriaDAO.updateCategoria(categoriainput, { id: id })

    return new CategoriaDTO(
      categoriafound.nombre,
      categoriafound.id
    );
  }

  static async deleteCategoria(id: Number) {
    await categoriaDAO.deleteCategoria({ id: id })
  }
}