import { type Request, type Response } from "express";
import { ticketDAO } from "./ticket.DAO.js";
import { TicketDTO } from "./DTO/ticket.dto.js";
import { TicketService } from "./ticket.service.js";

class ticketController {

  async createTicket(req: Request, res: Response) {
    try {
      const ticketInput = req.body;
      const newTicket = await TicketService.createTicket(ticketInput)

      res.status(200).json({ message: "Ticket creado", data: newTicket });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const ticketsRecovered = await TicketService.getAllTickets()

      res.status(200).json({ message: "Ticket Recuperados", data: ticketsRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ticketInput = req.body;

      const updatedTicket = await TicketService.updateTicket(ticketInput, id);

      res.status(200).json({
        message: "Ticket actualizado",
        data: updatedTicket
      });
    } catch (error: any) {
      res.status(404).json({
        error: error.message
      });
    }
  }

}

export const ticketcontroller = new ticketController();