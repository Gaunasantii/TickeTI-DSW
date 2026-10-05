import { NotFoundError } from "../utils/base.error.js";
import { ticketDAO } from "./ticket.DAO.js";

export class TicketService {
  static async getAllTickets() {
    return await ticketDAO.findAll({});
  }

  static async createTicket(ticketInput: any) {
    return await ticketDAO.createTicket(ticketInput);
  }

  static async updateTicket(ticketInput: any, id: Number) {
    const ticketToUpdate = await ticketDAO.findOne({ id: id });
    if(!ticketToUpdate)throw new NotFoundError("Ticket no encontrado")
    return await ticketDAO.updateTicket(ticketInput,ticketToUpdate)
  }
}