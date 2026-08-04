import { type Request, type Response } from "express";
import { categoriaDAO } from "../DAO/categoria.DAO.js";
import { CategoriaDTO } from "../DTO/categoria/categoria.dto.js";

class CategoriaController {

    async createCategoria(req: Request, res: Response) {
        try {
            const categoriaInput = req.body;
            const newCategoria = await categoriaDAO.createCategoria(categoriaInput);
            
            const categoriaDTO = new CategoriaDTO(
                newCategoria.nombre,
                newCategoria.id
            );

            res.status(201).json({ message: "Categoria creado", data: categoriaDTO });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categoriasRecovered = await categoriaDAO.findAll({});
            
            const categoriasDTO = categoriasRecovered.map((categoria: any) =>
                new CategoriaDTO(
                    categoria.nombre,
                    categoria.id
                )
            );

            res.status(200).json({ message: "Categorias Recuperados", data: categoriasDTO })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const categoriainput = req.body;

            const categoriafound = await categoriaDAO.updateCategoria(categoriainput, { id: Number.parseInt(id) })

            const categoriaDTO = new CategoriaDTO(
                categoriafound.nombre,
                categoriafound.id
            );

            res.status(200).json({
                message: "Categoria actualizado",
                data: categoriaDTO
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategoria(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const categoriafound = await categoriaDAO.deleteCategoria({ id: Number.parseInt(id) })

            const categoriaDTO = new CategoriaDTO(
                categoriafound.nombre,
                categoriafound.id
            );

            res.status(200).json({
                message: "Categoria eliminado",
                data: categoriaDTO
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const Categoriacontroller = new CategoriaController();