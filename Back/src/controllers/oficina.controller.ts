import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { OficinaSchema } from "../models/oficina.entity.js";
import { EmpresaSchema } from "../models/empresa.entity.js";

class oficinaController{

  async createOficina(req: Request, res: Response) {
    try {
      const em = orm.em.fork();
      const { nombre, empresa_id } = req.body;
      const idNumero = Number(empresa_id);

      const empresaEncontrada = await em.findOne(EmpresaSchema, { id: idNumero });
      
      if (!empresaEncontrada) {
        return res.status(404).json({ error: `No se encontró ninguna empresa con el ID: ${idNumero}` });
      }

      const newOficina = em.create(OficinaSchema, {
        nombre: nombre,
        empresa: empresaEncontrada
      });

      await em.persist(newOficina);
      await em.flush();
      
      res.status(201).json({ message: "Oficina creada", data: newOficina });
    } catch (error: any) {
      console.error("Error detallado:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const oficinaRecovered=await em.findAll(OficinaSchema);
      res.status(200).json({message:"Oficinas Recuperadas",data:oficinaRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateOficina(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const oficinainput = req.body;

      const oficinafound = await em.findOneOrFail(OficinaSchema, {id: Number(id)})

      em.assign(oficinafound , oficinainput);

      await em.flush();

      res.status(200).json({
        message: "Oficina actualizada",
        data:oficinafound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }

  async deleteOficina(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;

      const oficinafound = await em.findOneOrFail(OficinaSchema, {id: Number(id)})

      em.remove(oficinafound);

      await em.flush();

      res.status(200).json({
        message: "Oficina eliminado",
        data:oficinafound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const oficinacontroller = new oficinaController();