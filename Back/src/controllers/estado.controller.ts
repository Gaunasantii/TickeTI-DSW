import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { EstadoSchema } from "../models/estado.entity.js";

class EstadoController{
  async createNew(req:Request,res:Response){
    try{
      const em = orm.em.fork();
      const estadoInput=req.body;
      const newEstado =em.create(EstadoSchema,estadoInput);
      em.persist(newEstado);
      await em.flush();

      res.status(200).json({message:"estado creado correctamente",data:newEstado});
    } catch(error:any) {
      res.status(500).json({error:error.message});
    }
  }

  async findAll(req:Request,res:Response){
    try{
      const em = orm.em.fork();
      const recoveredEstados = await em.findAll(EstadoSchema);

      res.status(200).json({message:"estados recuperados",data:recoveredEstados});
    } catch(error:any) {
      res.status(500).json({error:error.message});
    }
  }
}

export const estadoController = new EstadoController();