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
import { ChangePrioritySchema } from "./DTO/ChangePriority.dto.js";
import { ChangeCategoriaSchema } from "./DTO/ChangeCategoria.dto.js";
import { ChangeStateSchema } from "./DTO/ChangeState.dto.js";

/**
 * @openapi
 * /tickets:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Crear un nuevo ticket de soporte
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicketDto'
 *     responses:
 *       201:
 *         description: Ticket creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TicketOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 * 
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Obtener listado de tickets
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de tickets recuperado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/TicketOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */

ticketrouter.post("/tickets",authenticateToken,authorizeRoles('tecnico','user'),ValidationMiddleware(CreateTicketSchema), ticketcontroller.createTicket);
ticketrouter.get("/tickets",authenticateToken, ticketcontroller.findAll);

/**
 * @openapi
 * /tickets/{id}:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Obtener un ticket por ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Ticket encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TicketOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   put:
 *     tags:
 *       - Tickets
 *     summary: Modificar datos de un ticket
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyTicketDto'
 *     responses:
 *       200:
 *         description: Ticket modificado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TicketOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Tickets
 *     summary: Eliminar un ticket por ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Ticket eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

ticketrouter.put("/tickets/:id",authenticateToken,ValidationMiddleware(ModifyTicketSchema), ticketcontroller.updateTicket);
ticketrouter.patch("/tickets/:id/resolve",authenticateToken,authorizeRoles('tecnico'),ValidationMiddleware(ResolveTicketSchema), ticketcontroller.resolveTicket);

/**
 * @openapi
 * /tickets/paginated:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Obtener tickets con paginación y filtros
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: cantPerPage
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *       - in: query
 *         name: estadoId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoriaId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: prioridadId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista paginada de tickets recuperada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponsePagination'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/TicketOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */

ticketrouter.get("/tickets/paginated",authenticateToken,ValidationMiddleware(PaginatedTicket),ticketcontroller.GetAllPaginated)

/**
 * @openapi
 * /tickets/{id}/categoria:
 *   patch:
 *     tags:
 *       - Tickets
 *     summary: Cambiar la categoría de un ticket
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeCategoriaDto'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 * /tickets/{id}/prioridad:
 *   patch:
 *     tags:
 *       - Tickets
 *     summary: Cambiar la prioridad de un ticket
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePriorityDto'
 *     responses:
 *       200:
 *         description: Prioridad actualizada
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 * /tickets/{id}/estado:
 *   patch:
 *     tags:
 *       - Tickets
 *     summary: Cambiar el estado de un ticket
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeStateDto'
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 * /tickets/{id}/resolver:
 *   patch:
 *     tags:
 *       - Tickets
 *     summary: Resolver un ticket agregando su solución
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResolveTicketDto'
 *     responses:
 *       200:
 *         description: Ticket resuelto exitosamente
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

ticketrouter.patch("/tickets/:id/priority",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(ChangePrioritySchema),ticketcontroller.ChangePriority);
ticketrouter.patch("/tickets/:id/categoria",authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(ChangeCategoriaSchema),ticketcontroller.ChangeCategoria);
ticketrouter.patch("/tickets/:id/state",authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(ChangeStateSchema),ticketcontroller.ChangeState);
ticketrouter.delete("/My-tickets/:id",authenticateToken,authorizeRoles('user','tecnico'),ticketcontroller.deleteMyTicket);
ticketrouter.get("/My-tickets/paginated",authenticateToken,ValidationMiddleware(PaginatedTicket),ticketcontroller.getMyTickets);
