import { TicketDTO } from "./DTO/ticket.dto.js";
import { ticketDAO } from "./ticket.DAO.js";

export class TicketService {
  static async getAllTickets() {
    const ticketRecovered = await ticketDAO.findAll({});

    return ticketRecovered.map((ticket: any) =>
      new TicketDTO(
        ticket.title,
        ticket.description,
        ticket.estado?.id,
        ticket.prioridad?.id,
        ticket.categoria?.id,
        ticket.usuario?.dni,
        ticket.id
      )
    );
  }

  static async createTicket(ticketInput: any) {
    const newTicket = await ticketDAO.createTicket(ticketInput);

    return new TicketDTO(
      newTicket.title,
      newTicket.description,
      newTicket.estado?.id,
      newTicket.prioridad?.id,
      newTicket.categoria?.id,
      newTicket.usuario?.dni,
      newTicket.id
    );
  }

  static async updateTicket(ticketInput: any, id: Number) {
    const ticketToUpdate = await ticketDAO.updateTicket(ticketInput, { id: id });

    return new TicketDTO(
      ticketToUpdate.title,
      ticketToUpdate.description,
      ticketToUpdate.estado?.id,
      ticketToUpdate.prioridad?.id,
      ticketToUpdate.categoria?.id,
      ticketToUpdate.usuario?.dni,
      ticketToUpdate.id
    );
  }
}