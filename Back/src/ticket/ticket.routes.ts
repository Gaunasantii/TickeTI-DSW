import { Router } from "express";
export const ticketrouter:Router = Router();
import { ticketcontroller } from "./ticket.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateTicketSchema } from "./DTO/CreateTicket.dto.js";
import { ModifyTicketSchema } from "./DTO/ModifyTicket.dto.js";

ticketrouter.post("/tickets",ValidationMiddleware(CreateTicketSchema), ticketcontroller.createTicket);
ticketrouter.get("/tickets", ticketcontroller.findAll);
ticketrouter.put("/tickets/:id",ValidationMiddleware(ModifyTicketSchema), ticketcontroller.updateTicket);
