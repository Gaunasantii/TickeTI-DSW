import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { EmpresaSchema } from "../models/empresa.entity.js";

class empresaController{

  async createEmpresa(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const empresaInput=req.body;
      const newEmpresa=em.create(EmpresaSchema,empresaInput);
      em.persist(newEmpresa);
      await em.flush();
      res.status(201).json({message:"Empresa creada",data:newEmpresa});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const empresaRecovered=await em.findAll(EmpresaSchema);
      res.status(200).json({message:"Empresa Recuperadas",data:empresaRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateEmpresa(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const empresainput = req.body;

      const empresafound = await em.findOneOrFail(EmpresaSchema, {id: Number(id)})

      em.assign(empresafound , empresainput);

      await em.flush();

      res.status(200).json({
        message: "Empresa actualizada",
        data:empresafound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }

  async deleteEmpresa(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;

      const empresafound = await em.findOneOrFail(EmpresaSchema, {id: Number(id)})

      em.remove(empresafound);

      await em.flush();

      res.status(200).json({
        message: "Empresa eliminado",
        data:empresafound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const empresacontroller = new empresaController();