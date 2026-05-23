import { orm } from "../config/db.js";
import { TicketSchema } from "../models/ticket.entity.js";

export class ticketDAO {
  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const ticketRecovered = await em.findAll(TicketSchema, filters);
      return ticketRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const ticketFound = await em.findOneOrFail(TicketSchema, filters);
      return ticketFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createTicket(ticketInput: any) {
    try {
      const em = orm.em.fork();
      const newTicket = em.create(TicketSchema, ticketInput);
      em.persist(newTicket);
      await em.flush();
      return newTicket;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateTicket(ticketInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const ticketToUpdate = await em.findOneOrFail(TicketSchema, filters);
      em.assign(ticketToUpdate, ticketInput);
      await em.flush();
      return ticketToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteTicket(filters: any) {
    try {
      const em = orm.em.fork();
      const ticketToDelete = await em.findOneOrFail(TicketSchema, filters);
      em.remove(ticketToDelete);
      await em.flush();
      return ticketToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}