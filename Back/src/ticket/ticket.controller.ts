import { type Request, type Response } from "express";
import { TicketService } from "./ticket.service.js";
import { ApiPaginationResponse, ApiSuccessResponse } from "../utils/api.response.js";
import type { CreateTicketInDto } from "./DTO/CreateTicket.dto.js";
import { TicketOutSchema, type TicketDto } from "./DTO/TicketOut.dto.js";
import { wrap } from "@mikro-orm/core";
import type { ResolveTicketInBodyDto } from "./DTO/ResolveTicket.dto.js";
import type { ModifyTicketInBodyDto, ModifyTicketInParamsDto } from "./DTO/ModifyTicket.dto.js";
import type { ticketQueryParamsDto } from "./DTO/PaginatedTicket.dto.js";
import type { ChangePriorityInBodyDto } from "./DTO/ChangePriority.dto.js";
import type { ChangeCategoriaInBodyDto } from "./DTO/ChangeCategoria.dto.js";
import type { ChangeStateInBodyDto } from "./DTO/ChangeState.dto.js";

class ticketController {

  async createTicket(req: Request<any,any,CreateTicketInDto>, res: Response) {
      const ticketInput = {...req.body,usuario:req.user.dni,empresa:req.user.empresa};
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

  async resolveTicket(req: Request<ModifyTicketInParamsDto,any,ResolveTicketInBodyDto>, res: Response) {
    const id = Number(req.params.id);
    const solucion = req.body.solucion;
    const ticketResolved = await TicketService.resolveTicket(solucion, id);
    const ticketDto=TicketOutSchema.parse(wrap(ticketResolved).toJSON())
    res.status(200).json(new ApiSuccessResponse<TicketDto>(ticketDto,"Ticket Resuelto con exito"));
  }

  async GetAllPaginated(req:Request<any, any,any,ticketQueryParamsDto>,res:Response){

    const { categoria, estado, page, cantPerPage } = req.query;

    const categoriaId=categoria?Number(categoria):undefined;
    const estadoId=estado?Number(estado):undefined;
    const pageNum=Number(page);
    const limit=Number(cantPerPage);


    const {tickets,count}=await TicketService.getPaginatedByStateAndCategory(req.user,pageNum,limit,estadoId,categoriaId)
    const ticketsDto=tickets.map(t=>TicketOutSchema.parse(wrap(t).toJSON()))

    res.status(200).json(new ApiPaginationResponse<TicketDto>(ticketsDto,{currentPage:pageNum,itemsPerPage:limit,totalItems:count,totalPages:Math.ceil(count/limit)},"Tickets recuperados"))
  }

  async ChangePriority(req: Request<ModifyTicketInParamsDto,any,ChangePriorityInBodyDto>, res: Response) {
    const id = Number(req.params.id);
    const newPriorityId = req.body.prioridad;
    const ticketUpdated = await TicketService.ChangePriority(id, newPriorityId);
    const ticketDto=TicketOutSchema.parse(wrap(ticketUpdated).toJSON())
    res.status(200).json(new ApiSuccessResponse<TicketDto>(ticketDto,"Prioridad del ticket actualizada con exito"));
  }
  
  async ChangeCategoria(req: Request<ModifyTicketInParamsDto,any,ChangeCategoriaInBodyDto>, res: Response) {
    const id = Number(req.params.id);
    const newCategoriaId = req.body.categoria;
    const ticketUpdated = await TicketService.ChangeCategoria(id, newCategoriaId);
    const ticketDto=TicketOutSchema.parse(wrap(ticketUpdated).toJSON())
    res.status(200).json(new ApiSuccessResponse<TicketDto>(ticketDto,"Categoría del ticket actualizada con exito"));
  }

  async ChangeState(req: Request<ModifyTicketInParamsDto,any,ChangeStateInBodyDto>, res: Response) {
    const id = Number(req.params.id);
    const newEstadoId = req.body.estado;
    const ticketUpdated = await TicketService.ChangeState(id, newEstadoId);
    const ticketDto=TicketOutSchema.parse(wrap(ticketUpdated).toJSON())
    res.status(200).json(new ApiSuccessResponse<TicketDto>(ticketDto,"Estado del ticket actualizado con exito"));
  }
}

export const ticketcontroller = new ticketController();