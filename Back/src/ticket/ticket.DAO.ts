import { error } from "node:console";
import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { TicketSchema } from "./ticket.entity.js";

export class ticketDAO {
  static async findAll(filters: any) {
      const em = orm.em ;
      const ticketRecovered = await em.findAll(TicketSchema, filters);
      return ticketRecovered;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const ticketFound = await em.findOne(TicketSchema, filters);
      return ticketFound;
  }

  static async createTicket(ticketInput: any) {
      const em = orm.em ;
      const newTicket = em.create(TicketSchema, ticketInput);
      em.persist(newTicket);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newTicket;
  }

  static async updateTicket(ticketInput: any, ticketToUpdate:any) {
      const em = orm.em ;
      em.assign(ticketToUpdate, ticketInput);
      await em.flush().catch((error)=>mapDbErrorToAppError(error));
      return ticketToUpdate;
  }

  static async deleteTicket(ticketToDelete:any) {
      const em = orm.em ;
      em.remove(ticketToDelete);
      await em.flush().catch((error)=>mapDbErrorToAppError(error));
      return ticketToDelete;
  }
}