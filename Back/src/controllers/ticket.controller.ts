import { type Request, type Response } from "express";
import { orm } from "../config/db.js";
import { TicketSchema } from "../models/ticket.entity.js";

class ticketController{

  async createTicket(req:Request,res:Response){
    try{
      const em=orm.em.fork()
      const ticketInput=req.body;
      const newTicket=em.create(TicketSchema,ticketInput);
      em.persist(newTicket);
      await em.flush();
      res.status(201).json({message:"Ticket creado",data:newTicket});
    }catch(error:any){
      res.status(500).json({error:error.message})
    }
  };

  async findAll(req:Request,res:Response){
    try{
      const em=orm.em.fork();
      const ticketRecovered=await em.findAll(TicketSchema);
      res.status(200).json({message:"Ticket Recuperados",data:ticketRecovered})
    }catch(error:any){
      res.status(500).json({error:error.message});
    }
  }

  async updateTicket(req:Request, res:Response){
    try{
      const em=orm.em.fork();
      const {id} = req.params;
      const ticketinput = req.body;

      const ticketfound = await em.findOneOrFail(TicketSchema, {id: Number(id)})

      em.assign(ticketfound , ticketinput);

      await em.flush();

      res.status(200).json({
        message: "Ticket actualizado",
        data:ticketfound
      });
    } catch (error: any) {
      res.status(500).json ({
        error:error.message
      });
    }
  }

}

export const ticketcontroller = new ticketController();