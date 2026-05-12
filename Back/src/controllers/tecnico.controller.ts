import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { TecnicoSchema } from "../models/tecnico.entity.js";

class tecnicoController{

  async createTecnico(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const tecnicoInput=req.body;
      const newTecnico=em.create(TecnicoSchema,tecnicoInput);
      em.persist(newTecnico);
      await em.flush();
      res.status(201).json({message:"Tecnico creado",data:newTecnico});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const tecnicosRecovered=await em.findAll(TecnicoSchema);
      res.status(200).json({message:"Tecnicos Recuperados",data:tecnicosRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateTecnico(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const dni = req.params.dni;
      const tecnicoinput = req.body;

      const tecnicofound = await em.findOneOrFail(TecnicoSchema, {dni: dni as string})

      if (!tecnicofound) {
        return res.status(404).json({
          message: "Tecnico no encontrado"
        });
      }

      em.assign(tecnicofound , tecnicoinput);

      await em.flush();

      return res.status(200).json({
        message: "Tecnico actualizado",
        data:tecnicofound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }

  async deleteTecnico(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const dni = req.params.dni;

      const tecnicofound = await em.findOneOrFail(TecnicoSchema, {dni: dni as string})

      em.remove(tecnicofound);

      await em.flush();

      res.status(200).json({
        message: "Tecnico eliminado",
        data:tecnicofound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const tecnicocontroller = new tecnicoController();