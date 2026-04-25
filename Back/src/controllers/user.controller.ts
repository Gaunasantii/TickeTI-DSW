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
}

export const usercontroller = new userController();

