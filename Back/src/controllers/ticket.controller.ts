import { type Request, type Response } from "express";
import { ticketDAO } from "../DAO/ticket.DAO.js";

class ticketController {

  async createTicket(req: Request, res: Response) {
    try {
      const ticketInput = req.body;
      const newTicket = await ticketDAO.createTicket(ticketInput);
      res.status(201).json({ message: "Ticket creado", data: newTicket });
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  };

  async findAll(req: Request, res: Response) {
    try {
      const ticketRecovered = await ticketDAO.findAll({});
      res.status(200).json({ message: "Ticket Recuperados", data: ticketRecovered })
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ticketInput = req.body;

      const ticketToUpdate = await ticketDAO.updateTicket(ticketInput, { id: Number(id) });

      res.status(200).json({
        message: "Ticket actualizado",
        data: ticketToUpdate
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message
      });
    }
  }

}

export const ticketcontroller = new ticketController();