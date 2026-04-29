import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { UserSchema } from "../models/usuario.entity.js";

class userController{

  async createUser(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const userInput=req.body;
      const newUser=em.create(UserSchema,userInput);
      em.persist(newUser);
      await em.flush();
      res.status(201).json({message:"Usuario creado",data:newUser});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const usersRecovered=await em.findAll(UserSchema);
      res.status(200).json({message:"Usuarios Recuperados",data:usersRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateUser(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const userinput = req.body;

      const userfound = await em.findOne(UserSchema, {dni: id})

      if (!userfound) {
        return res.status(404).json({
          message: "Usuario no encontrado"
        });
      }

      em.assign(userfound , userinput);

      await em.flush();

      return res.status(200).json({
        message: "Usuario actualizado",
        data:userfound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }

  async deleteUser(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;

      const userfound = await em.findOne(UserSchema, {dni: id})

      if (!userfound) {
        return res.status(404).json({
          message: "Usuario no encontrado"
        });
      }

      em.remove(userfound);

      await em.flush();

      return res.status(200).json({
        message: "Usuario eliminado",
        data:userfound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }


}

export const usercontroller = new userController();