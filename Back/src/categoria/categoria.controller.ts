import { type Request, type Response } from "express";
import { categoriaDAO } from "./categoria.DAO.js";
import { CategoriaDTO } from "./DTO/categoria.dto.js";
import { CategoriaService } from "./categoria.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class CategoriaController {

    async createCategoria(req: Request, res: Response) {
            const categoriaInput = req.body;
            await CategoriaService.createCategoria(categoriaInput);
            res.status(201).json(new ApiSuccessResponse<null>(null,"Categoria creada exitosamente"));
        
    }

    async findAll(req: Request, res: Response) {
            const categorias = await CategoriaService.getallCategorias();
            res.status(200).json(new ApiSuccessResponse<CategoriaDTO[]>(categorias,"Categorias recuperadas exitosamente"))
    }

    async updateCategoria(req: Request, res: Response) {
            const id = Number(req.params.id);
            const categoriainput = req.body;
            const categoria = await CategoriaService.updateCategoria(categoriainput, id)

            res.status(200).json(new ApiSuccessResponse<CategoriaDTO>(categoria,"Categoria recuperada con exito"));
    }

    async deleteCategoria(req: Request, res: Response) {
            const id = Number(req.params.id);
            await CategoriaService.deleteCategoria(id);
            res.status(200).json(new ApiSuccessResponse<null>(null,"Categoria eliminada con exito"))
    }
}

export const Categoriacontroller = new CategoriaController();