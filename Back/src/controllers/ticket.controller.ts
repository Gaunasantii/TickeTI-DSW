import { type Request, type Response } from "express";
import { ticketDAO } from "../DAO/ticket.DAO.js";
import { TicketDTO } from "../DTO/ticket.dto.js";

class ticketController {

  async createTicket(req: Request, res: Response) {
    try {
      const ticketInput = req.body;
      const newTicket = await ticketDAO.createTicket(ticketInput);
      
      const ticketDTO = new TicketDTO(
        newTicket.title,
        newTicket.description,
        newTicket.estado?.id,
        newTicket.prioridad?.id,
        newTicket.categoria?.id,
        newTicket.usuario?.dni,
        newTicket.id
      );
      
      res.status(201).json({ message: "Ticket creado", data: ticketDTO });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const ticketRecovered = await ticketDAO.findAll({});
      
      const ticketsDTO = ticketRecovered.map((ticket: any) =>
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

      res.status(200).json({ message: "Ticket Recuperados", data: ticketsDTO })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ticketInput = req.body;

      const ticketToUpdate = await ticketDAO.updateTicket(ticketInput, { id: Number(id) });

      const ticketDTO = new TicketDTO(
        ticketToUpdate.title,
        ticketToUpdate.description,
        ticketToUpdate.estado?.id,
        ticketToUpdate.prioridad?.id,
        ticketToUpdate.categoria?.id,
        ticketToUpdate.usuario?.dni,
        ticketToUpdate.id
      );

      res.status(200).json({
        message: "Ticket actualizado",
        data: ticketDTO
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

}

export const ticketcontroller = new ticketController();