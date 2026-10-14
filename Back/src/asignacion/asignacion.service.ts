import { asignacionDAO } from "./asignacion.DAO.js";
import { ConflictError, NotFoundError } from "../utils/base.error.js";
import { EstadoDAO } from "../estado/estado.DAO.js";
import { ticketDAO } from "../ticket/ticket.DAO.js";
import type { CreateAsignacionInDto } from './DTO/CreateAsignacion.dto.js'

export class AsignacionService {
  
  static async createAsignacion(asignacionInput: CreateAsignacionInDto) {
    const estadoIntermedio=await EstadoDAO.findOne({esEstadoInicial: false,esEstadoFinal: false,esEstadoBase:true})
    const ticket= await ticketDAO.findOne({ id: asignacionInput.ticket });
    if(!ticket) throw new NotFoundError("Ticket no encontrado", `El ticket con el id ${asignacionInput.ticket} no fue encontrado`);
    await ticketDAO.updateTicket({ estado: estadoIntermedio!.id }, ticket);
    await asignacionDAO.createAsignacion(asignacionInput);
  }

  static async getAllAsignaciones() {
    return await asignacionDAO.findAll({})
  }

  static async changeStateAsignacion(id: number, asignacionInput: any) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    return await asignacionDAO.updateAsignacion(asignacionInput, asignacionFound);
  }

  static async deleteAsignacion(id: number) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    await asignacionDAO.deleteAsignacion(asignacionFound);
  }

  static async getAsignacionesPendientesPaginated(page: number, pageSize: number,dni:string) {
    const filters = { estado:true, tecnico:dni, fechaCierre:null };
    return await asignacionDAO.getPaginated(filters, page, pageSize, {populate: ["ticket.estado","ticket.categoria","ticket.prioridad"]});
  }

  static async abandonarMiAsignacion(id: number, dni: string) {
    const asignacionFound = await asignacionDAO.findOne({ id: id });
    if(!asignacionFound) throw new NotFoundError("Asignacion no encontrada", `La asignacion con el id ${id} no fue encontrada`);
    if(asignacionFound.tecnico.dni !== dni) throw new ConflictError("La asignacion no te pertenece", `La asignacion con el id ${id} no te pertenece`); 
    await asignacionDAO.updateAsignacion({ estado: false, fechaCierre: new Date() }, asignacionFound);
  }
}