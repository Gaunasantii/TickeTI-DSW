import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { PrioridadSchema } from "../models/prioridad.entity.js";

class prioridadController{

  async createPrioridad(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const prioridadInput=req.body;
      const newPrioridad=em.create(PrioridadSchema,prioridadInput);
      em.persist(newPrioridad);
      await em.flush();
      res.status(201).json({message:"Prioridad creado",data:newPrioridad});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const prioridadRecovered=await em.findAll(PrioridadSchema);
      res.status(200).json({message:"Prioridades Recuperadas",data:prioridadRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updatePrioridad(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const prioridadinput = req.body;

      const prioridadfound = await em.findOne(PrioridadSchema, {id: Number(id)})

      if (!prioridadfound) {
        return res.status(404).json({
          message: "Prioridad no encontrado"
        });
      }

      em.assign(prioridadfound , prioridadinput);

      await em.flush();

      return res.status(200).json({
        message: "Prioridad actualizada",
        data:prioridadfound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }

  async deletePrioridad(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;

      const prioridadfound = await em.findOne(PrioridadSchema, {id: Number(id)})

      if (!prioridadfound) {
        return res.status(404).json({
          message: "Prioridad no encontrada"
        });
      }

      em.remove(prioridadfound);

      await em.flush();

      return res.status(200).json({
        message: "Prioridad eliminado",
        data:prioridadfound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const prioridadcontroller = new prioridadController();