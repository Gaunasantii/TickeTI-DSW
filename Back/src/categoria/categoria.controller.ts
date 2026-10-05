import { type Request, type Response } from "express";
import { type CategoriaDto ,CategoriaOutSchema } from "./DTO/CategoriaOut.dto.js";
import { CategoriaService } from "./categoria.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateCategoriaInDto } from "./DTO/CreateCategoria.dto.js";
import { wrap } from "@mikro-orm/core";
import type { ModifyCategoriaInBodyDto, ModifyCategoriaInParamsDto } from "./DTO/ModifyCategoria.dto.js";

class CategoriaController {

    async createCategoria(req: Request<any,any,CreateCategoriaInDto>, res: Response) {
            const categoriaInput = {...req.body,empresa:req.user.empresa};
            await CategoriaService.createCategoria(categoriaInput);
            res.status(201).json(new ApiSuccessResponse<null>(null,"Categoria creada exitosamente"));
        
    }

    async findAll(req: Request, res: Response) {
            const categorias = await CategoriaService.getallCategorias();
            const categoriasDto=categorias.map(c=>CategoriaOutSchema.parse(wrap(c).toJSON()))
            res.status(200).json(new ApiSuccessResponse<CategoriaDto[]>(categoriasDto,"Categorias recuperadas exitosamente"))
    }

    async updateCategoria(req: Request<ModifyCategoriaInParamsDto,any,ModifyCategoriaInBodyDto>, res: Response) {
            const id = Number(req.params.id);
            const categoriainput = req.body;
            const categoria = await CategoriaService.updateCategoria(categoriainput, id)
            const categoriaDto=CategoriaOutSchema.parse(wrap(categoria).toJSON());

            res.status(200).json(new ApiSuccessResponse<CategoriaDto>(categoriaDto,"Categoria modificada con exito"));
    }

    async deleteCategoria(req: Request<ModifyCategoriaInParamsDto,any,any>, res: Response) {
            const id = Number(req.params.id);
            await CategoriaService.deleteCategoria(id);
            res.status(200).json(new ApiSuccessResponse<null>(null,"Categoria eliminada con exito"))
    }
}

export const Categoriacontroller = new CategoriaController();