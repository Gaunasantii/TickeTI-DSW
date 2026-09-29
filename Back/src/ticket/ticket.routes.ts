import { Router } from "express";
export const ticketrouter:Router = Router();
import { ticketcontroller } from "./ticket.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateTicketSchema } from "./DTO/CreateTicket.dto.js";
import { ModifyTicketSchema } from "./DTO/ModifyTicket.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

ticketrouter.post("/tickets",authenticateToken,authorizeRoles('tecnico','user'),ValidationMiddleware(CreateTicketSchema), ticketcontroller.createTicket);
ticketrouter.get("/tickets", ticketcontroller.findAll);
ticketrouter.put("/tickets/:id",ValidationMiddleware(ModifyTicketSchema), ticketcontroller.updateTicket);
