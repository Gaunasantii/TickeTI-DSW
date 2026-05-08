import { Request, Response } from "express";
import { orm } from "../config/db.js";
import { TicketSchema } from "../models/ticket.entity.js";

class ticketController{

  async createTecnico(req:Request,res:Response){
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

      const ticketfound = await em.findOne(TicketSchema, {id: Number(id)})

      if (!ticketfound) {
        return res.status(404).json({
          message: "Ticket no encontrado"
        });
      }

      em.assign(ticketfound , ticketinput);

      await em.flush();

      return res.status(200).json({
        message: "Ticket actualizado",
        data:ticketfound
      });
    } catch (error: any) {
      return res.status(500).json ({
        error:error.message
      });
    }
  }

}

export const ticketcontroller = new ticketController();