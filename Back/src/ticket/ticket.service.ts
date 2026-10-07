import { asignacionDAO } from "../asignacion/asignacion.DAO.js";
import { categoriaDAO } from "../categoria/categoria.DAO.js";
import { EstadoDAO } from "../estado/estado.DAO.js";
import { prioridadDAO } from "../prioridad/prioridad.DAO.js";
import { NotFoundError, ConflictError } from "../utils/base.error.js";
import type { ModifyTicketInBodyDto } from "./DTO/ModifyTicket.dto.js";
import { ticketDAO } from "./ticket.DAO.js";
import { wrap } from "@mikro-orm/core";

export class TicketService {
  static async getAllTickets() {
    return await ticketDAO.findAll({});
  }

  static async createTicket(ticketInput: any) {
    const cat=await categoriaDAO.findOne({id:ticketInput.categoria})
    if(!cat)throw new NotFoundError("Categoría no encontrada");
    const prioridad = await prioridadDAO.findOne({id:ticketInput.prioridad})
    if(!prioridad)throw new NotFoundError("Prioridad no encontrada");
    const initialState=await EstadoDAO.findOne({esEstadoInicial:true})
    ticketInput={...ticketInput,fechaCreacion:new Date(),estado:initialState!.id}
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

  static async getPaginatedByStateAndCategory(user:any,page:number,limit:number,estadoId:number|undefined,categoriaId:number|undefined){
    let filters={};
    if(user.rol==='tecnico')filters={...filters,usuario:{$ne:user.dni}};
    if(estadoId!=undefined)filters={...filters,estado:estadoId};
    if(categoriaId!=undefined)filters={...filters,categoria:categoriaId};
    const {tickets,count}=await ticketDAO.GetAllPaginated(filters,page,limit);
    return {tickets,count};
  }

  static async getMyTicketsByCatAndState(dni:string,page:number,limit:number,estadoId:number|undefined,categoriaId:number|undefined){
    let filters={};
    filters={...filters,usuario:dni};
    if(estadoId!=undefined)filters={...filters,estado:estadoId};
    if(categoriaId!=undefined)filters={...filters,categoria:categoriaId};
    const {tickets,count}=await ticketDAO.GetAllPaginated(filters,page,limit);
    return {tickets,count};
  }

  static async ChangePriority(ticketId: number, newPriorityId: number) {
    const ticketToUpdate = await ticketDAO.findOne({ id: ticketId });
    if(!ticketToUpdate)throw new NotFoundError("Ticket no encontrado");
    const newPriority = await prioridadDAO.findOne({ id: newPriorityId });
    if(!newPriority)throw new NotFoundError("Prioridad no encontrada");
    return await ticketDAO.updateTicket({prioridad:newPriorityId}, ticketToUpdate);
  }

  static async ChangeCategoria(ticketId: number, newCategoriaId: number) {
    const ticketToUpdate = await ticketDAO.findOne({ id: ticketId });
    if(!ticketToUpdate)throw new NotFoundError("Ticket no encontrado");
    const newCategoria = await categoriaDAO.findOne({ id: newCategoriaId });
    if(!newCategoria)throw new NotFoundError("Categoría no encontrada");
    return await ticketDAO.updateTicket({categoria:newCategoriaId}, ticketToUpdate);
  }

  static async ChangeState(ticketId: number, newEstadoId: number) {
    const ticketToUpdate = await ticketDAO.findOne({ id: ticketId });
    if(!ticketToUpdate)throw new NotFoundError("Ticket no encontrado");
    const newEstado = await EstadoDAO.findOne({ id: newEstadoId });
    if(!newEstado)throw new NotFoundError("Estado no encontrado");
    return await ticketDAO.updateTicket({estado:newEstadoId}, ticketToUpdate);
  }
}