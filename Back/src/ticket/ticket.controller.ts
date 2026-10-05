import { type Request, type Response } from "express";
import { TicketService } from "./ticket.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateTicketInDto } from "./DTO/CreateTicket.dto.js";
import { TicketOutSchema, type TicketDto } from "./DTO/TicketOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { ModifyTicketInBodyDto, ModifyTicketInParamsDto } from "./DTO/ModifyTicket.dto.js";

class ticketController {

  async createTicket(req: Request<any,any,CreateTicketInDto>, res: Response) {
      const ticketInput = req.body;
      await TicketService.createTicket(ticketInput)

      res.status(201).json(new ApiSuccessResponse<null>(null,"Ticket creado Con exitos"));
  };

  async findAll(req: Request, res: Response) {
    const ticketsRecovered = await TicketService.getAllTickets()
    const ticketsDto=ticketsRecovered.map(t=>TicketOutSchema.parse(wrap(t).toJSON()))
    res.status(200).json(new ApiSuccessResponse<TicketDto[]>(ticketsDto,"Tickets Recuperados con exito"))
  }

  async updateTicket(req: Request<ModifyTicketInParamsDto,any,ModifyTicketInBodyDto>, res: Response) {
      const id = Number(req.params.id);
      const ticketInput = req.body;
      await TicketService.updateTicket(ticketInput, id);
      res.status(200).json(new ApiSuccessResponse<null>(null,"Ticket Actualizado con exito"));
  }

}

export const ticketcontroller = new ticketController();