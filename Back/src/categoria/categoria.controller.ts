import { type Request, type Response } from "express";
import { categoriaDAO } from "./categoria.DAO.js";
import { CategoriaDTO } from "./DTO/categoria.dto.js";
import { CategoriaService } from "./categoria.service.js";

class CategoriaController {

    async createCategoria(req: Request, res: Response) {
        try {
            const categoriaInput = req.body;
            const newCategoria = await CategoriaService.createCategoria(categoriaInput);

            res.status(200).json({ message: "Categoria creado", data: newCategoria });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categorias = await CategoriaService.getallCategorias();
            res.status(200).json({ message: "Categorias Recuperados", data: categorias })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const categoriainput = req.body;
            const categoria = await CategoriaService.updateCategoria(categoriainput, id)

            res.status(200).json({
                message: "Categoria actualizado",
                data: categoria
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteCategoria(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await CategoriaService.deleteCategoria(id);

            res.status(204).json({
                message: "Categoria eliminado",
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}

export const Categoriacontroller = new CategoriaController();