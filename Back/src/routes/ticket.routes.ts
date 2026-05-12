import { Router } from "express";
export const ticketrouter:Router = Router();
import { ticketcontroller } from "../controllers/ticket.controller.js";

ticketrouter.post("/tickets", ticketcontroller.createTicket);
ticketrouter.get("/tickets", ticketcontroller.findAll);
ticketrouter.put("/tickets/:id", ticketcontroller.updateTicket);
