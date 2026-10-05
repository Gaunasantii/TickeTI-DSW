import { asignacionDAO } from "../asignacion/asignacion.DAO.js";
import { categoriaDAO } from "../categoria/categoria.DAO.js";
import { EstadoDAO } from "../estado/estado.DAO.js";
import { NotFoundError, ConflictError } from "../utils/base.error.js";
import type { ModifyTicketInBodyDto } from "./DTO/ModifyTicket.dto.js";
import { ticketDAO } from "./ticket.DAO.js";
import { wrap } from "@mikro-orm/core";

export class TicketService {
  static async getAllTickets() {
    return await ticketDAO.findAll({});
  }

  static async createTicket(ticketInput: any) {
    return await ticketDAO.createTicket(ticketInput);
  }

  static async updateTicket(ticketInput: ModifyTicketInBodyDto, id: Number) {
    const ticketToUpdate = await ticketDAO.findOne({ id: id });
    if(!ticketToUpdate)throw new NotFoundError("Ticket no encontrado")
    return await ticketDAO.updateTicket(ticketToUpdate, ticketInput);
  }

  static async resolveTicket(solucion: string, id: number) {
    const ticketToResolve = await ticketDAO.findOne({ id: id });
    if(!ticketToResolve)throw new NotFoundError("Ticket no encontrado")
    if(ticketToResolve.fechaCierre)throw new ConflictError("Ticket ya cerrado","El ticket ya fue cerrado previamente")
    const lastAsignacion= await asignacionDAO.findOne({ticket:ticketToResolve.id,estado:true})
    if(!lastAsignacion)throw new ConflictError("No hay asignaciones activas para este ticket","El ticket debe ser asignado previo a ser resuelto")
    var newInputTicket= wrap(ticketToResolve).toJSON();
    newInputTicket.solucion=solucion;
    newInputTicket.fechaCierre=new Date();
    var newInputAsignacion= wrap(lastAsignacion).toObject();;
    newInputAsignacion.fechaCierre=new Date();

    await ticketDAO.updateTicket(newInputTicket,ticketToResolve);
    await asignacionDAO.updateAsignacion(newInputAsignacion,lastAsignacion);

    return newInputTicket;
  }

  static async getPaginatedByStateAndCategory(page:number,limit:number,estadoId:number|undefined,categoriaId:number|undefined){
    let filters={};
    if(estadoId!=undefined)filters={...filters,estado:estadoId};
    if(categoriaId!=undefined)filters={...filters,categoria:categoriaId};
    const {tickets,count}=await ticketDAO.GetAllPaginated(filters,page,limit);
    return {tickets,count};
  }
}