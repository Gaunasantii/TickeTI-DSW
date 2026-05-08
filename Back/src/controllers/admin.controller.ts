import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { adminSchema } from "../models/admin.entity.js";

class AdminController {

    async createAdmin(req:Request,res:Response){
        try{
            const em=orm.em.fork()
            const adminInput=req.body;
            const newAdmin=em.create(adminSchema,adminInput);
            em.persist(newAdmin);
            await em.flush();
            res.status(201).json({message:"Adminstrador creado",data:newAdmin});
        }catch(error:any){
            res.status(500).json({error:error.message});
        }
    }

    async findAll(req:Request,res:Response){
        try{
            const em=orm.em.fork();
            const adminRecovered=await em.findAll(adminSchema);
            res.status(200).json({message:"Administradores Recuperados",data:adminRecovered})
        }catch(error:any){
            res.status(500).json({error:error.message});
        }
    }
  
    async updateAdmin(req:Request, res:Response){
        try{
        const em=orm.em.fork();
        const {id} = req.params;
        const admininput = req.body;

        const adminfound = await em.findOne(adminSchema, {dni: id})

        if (!adminfound) {
            return res.status(404).json({
            message: "Administrador no encontrado"
            });
        }

        em.assign(adminfound , admininput);

        await em.flush();

        return res.status(200).json({
            message: "Admistrador actualizado",
            data:adminfound
        });
        } catch (error: any) {
            return res.status(500).json ({error:error.message});
        }
    }

    async deleteAdmin(req:Request, res:Response){
        try{
        const em=orm.em.fork();
        const {id} = req.params;

        const adminfound = await em.findOne(adminSchema, {dni: id})

        if (!adminfound) {
            return res.status(404).json({message: "Administrador no encontrado"});
        }

        em.remove(adminfound);

        await em.flush();

        return res.status(200).json({
            message: "Admistrador eliminado",
            data:adminfound
        });
        } catch (error: any) {
            return res.status(500).json ({error:error.message});
        }
    }
}

export const admincontroller = new AdminController();