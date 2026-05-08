import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { OficinaSchema } from "../models/oficina.entity.js";

class oficinaController{

  async createOficina(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const oficinaInput=req.body;
      const newOficina=em.create(OficinaSchema,oficinaInput);
      em.persist(newOficina);
      await em.flush();
      res.status(201).json({message:"Oficina creado",data:newOficina});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const oficinaRecovered=await em.findAll(OficinaSchema);
      res.status(200).json({message:"Empresa Recuperadas",data:oficinaRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateOficina(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const oficinainput = req.body;

      const oficinafound = await em.findOne(OficinaSchema, {id: Number(id)})

      if (!oficinafound) {
        return res.status(404).json({
          message: "Oficina no encontrado"
        });
      }

      em.assign(oficinafound , oficinainput);

      await em.flush();

      return res.status(200).json({
        message: "Oficina actualizada",
        data:oficinafound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }

  async deleteOficina(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;

      const oficinafound = await em.findOne(OficinaSchema, {id: Number(id)})

      if (!oficinafound) {
        return res.status(404).json({
          message: "Oficina no encontrada"
        });
      }

      em.remove(oficinafound);

      await em.flush();

      return res.status(200).json({
        message: "Oficina eliminado",
        data:oficinafound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const oficinacontroller = new oficinaController();