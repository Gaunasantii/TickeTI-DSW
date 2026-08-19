import { type Request, type Response } from "express";
import { categoriaDAO } from "./categoria.DAO.js";

class CategoriaController {

    async createCategoria(req: Request, res: Response) {
        try {
            const categoriaInput = req.body;
            const newCategoria = await categoriaDAO.createCategoria(categoriaInput);
            res.status(201).json({ message: "Categoria creado", data: newCategoria });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categoriasRecovered = await categoriaDAO.findAll({});
            res.status(200).json({ message: "Categorias Recuperados", data: categoriasRecovered })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const categoriainput = req.body;

            const categoriafound = await categoriaDAO.updateCategoria(categoriainput, { id: Number.parseInt(id) })

            res.status(200).json({
                message: "Categoria actualizado",
                data: categoriafound
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const categoriafound = await categoriaDAO.deleteCategoria({ id: Number.parseInt(id) })

            res.status(200).json({
                message: "Categoria eliminado",
                data: categoriafound
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const Categoriacontroller = new CategoriaController();