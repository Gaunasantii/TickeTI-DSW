import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { CategoriaSchema } from "../models/categoria.entity.js";

class CategoriaController {

    async createCategoria(req:Request,res:Response){
        try{
            const em=orm.em.fork()
            const categoriaInput=req.body;
            const newCategoria=em.create(CategoriaSchema, categoriaInput);
            em.persist(newCategoria);
            await em.flush();
            res.status(201).json({message:"Categoria creado",data:newCategoria});
        }catch(error:any){
            res.status(500).json({error:error.message});
        }
    }

    async findAll(req:Request,res:Response){
        try{
            const em=orm.em.fork();
            const categoriasRecovered=await em.findAll(CategoriaSchema);
            res.status(200).json({message:"Categorias Recuperados",data:categoriasRecovered})
        }catch(error:any){
            res.status(500).json({error:error.message});
        }
    }
  
    async updateCategoria(req:Request, res:Response){
        try{
        const em=orm.em.fork();
        const id = req.params.id as string;
        const categoriainput = req.body;

        const categoriafound = await em.findOneOrFail(CategoriaSchema, {id: Number.parseInt(id)})

        em.assign(categoriafound , categoriainput);

        await em.flush();

        res.status(200).json({
            message: "Categoria actualizado",
            data:categoriafound
        });
        } catch (error: any) {
            res.status(500).json ({error:error.message});
        }
    }

    async deleteCategoria(req:Request, res:Response){
        try{
        const em=orm.em.fork();
        const id = req.params.id;

        const categoriafound = await em.findOneOrFail(CategoriaSchema, {id: Number(id)})

        em.remove(categoriafound);

        await em.flush();

        res.status(200).json({
            message: "Categoria eliminado",
            data:categoriafound
        });
        } catch (error: any) {
            res.status(500).json ({error:error.message});
        }
    }
}

export const Categoriacontroller = new CategoriaController();