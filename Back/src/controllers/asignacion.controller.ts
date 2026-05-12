import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { asignacionSchema } from "../models/asignacion.entity.js";

class AsignacionController{
  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const asignacionesRecovered=await em.findAll(asignacionSchema);
      res.status(200).json({message:"asignaciones Recuperadas",data:asignacionesRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async createAsignacion(req:Request,res:Response){
        try{
          const em=orm.em.fork()
          const asignacionInput=req.body;
          const newAsignacion=em.create(asignacionSchema, asignacionInput);
          em.persist(newAsignacion);
          await em.flush();
          res.status(201).json({message:"asignacion creada",data:newAsignacion});
        }catch(error:any){
          res.status(500).json({error:error.message});
        }
  }

  async updateAsignacion(req:Request, res:Response){
      try{
        const em=orm.em.fork();
        const {id} = req.params;
        req.body.fechaCierre=new Date(req.body.fechaCierre)
        const asignacionInput=req.body
  
        const asignacionFound = await em.findOneOrFail(asignacionSchema, {id: Number(id)})
  
        em.assign(asignacionFound, asignacionInput);
  
        await em.flush();
  
        res.status(200).json({
          message: "asignacion actualizada",
          data:asignacionFound
        });
      } catch (error: any) {
        res.status(500).json ({
          error:error.message
        });
      }
    }


  async deleteAsignacion(req:Request, res:Response){
      try{
        const em=orm.em.fork();
        const {id} = req.params;
  
        const asignacionFound = await em.findOneOrFail(asignacionSchema, {id: Number(id)})
  
        em.remove(asignacionFound);
  
        await em.flush();
  
        res.status(200).json({
          message: "asignacion eliminada",
          data:asignacionFound
        });
      } catch (error: any) {
        res.status(500).json ({
          error:error.message
        });
      }
    }
}

export const asignacioncontroller=new AsignacionController();