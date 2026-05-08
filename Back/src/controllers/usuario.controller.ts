import { type Request, type Response } from "express";
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
      const {dni} = req.params;
      const userinput = req.body;

      const userfound = await em.findOneOrFail(UserSchema, {dni:(dni as string)})

      em.assign(userfound , userinput);

      await em.flush();

      return res.status(200).json({
        message: "Usuario actualizado",
        data:userfound//posteriormente reemplazar por un objeto usuario
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
      const {dni} = req.params;
      const userfound = await em.findOneOrFail(UserSchema, {dni:(dni as string)})

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