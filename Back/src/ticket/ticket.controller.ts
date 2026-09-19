import { type Request, type Response } from "express";
import { ticketDAO } from "./ticket.DAO.js";
import { TicketDTO } from "./DTO/ticket.dto.js";
import { TicketService } from "./ticket.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";

class ticketController {

  async createTicket(req: Request, res: Response) {
      const ticketInput = req.body;
      await TicketService.createTicket(ticketInput)

      res.status(201).json(new ApiSuccessResponse<null>(null,"Ticket creado Con exitos"));
  };

  async findAll(req: Request, res: Response) {
      const ticketsRecovered = await TicketService.getAllTickets()

      res.status(200).json(new ApiSuccessResponse<TicketDTO[]>(ticketsRecovered,"Tickets Recuperados con exito"))
  }

  async updateTicket(req: Request, res: Response) {
      const id = Number(req.params.id);
      const ticketInput = req.body;

      await TicketService.updateTicket(ticketInput, id);

      res.status(200).json(new ApiSuccessResponse<null>(null,"Ticket Actualizado con exito"));
  }

}

export const ticketcontroller = new ticketController();