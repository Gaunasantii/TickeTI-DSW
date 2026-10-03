import { Router } from "express";
export const ticketrouter:Router = Router();
import { ticketcontroller } from "./ticket.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateTicketSchema } from "./DTO/CreateTicket.dto.js";
import { ModifyTicketSchema } from "./DTO/ModifyTicket.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { ResolveTicketSchema } from "./DTO/ResolveTicket.dto.js";
import { PaginatedTicket } from "./DTO/PaginatedTicket.dto.js";

ticketrouter.post("/tickets",authenticateToken,authorizeRoles('tecnico','user'),ValidationMiddleware(CreateTicketSchema), ticketcontroller.createTicket);
ticketrouter.get("/tickets",authenticateToken, ticketcontroller.findAll);
ticketrouter.put("/tickets/:id",authenticateToken,ValidationMiddleware(ModifyTicketSchema), ticketcontroller.updateTicket);
ticketrouter.patch("/tickets/:id/resolve",authenticateToken,authorizeRoles('tecnico'),ValidationMiddleware(ResolveTicketSchema), ticketcontroller.resolveTicket);
ticketrouter.get("/tickets/paginated",authenticateToken,ValidationMiddleware(PaginatedTicket),ticketcontroller.GetAllPaginated)
