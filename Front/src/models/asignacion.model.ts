import { ticketPaginatedModel } from "./ticket.model";

export interface asignacionModel {
  id: number;
  ticket: ticketPaginatedModel;
  tecnico: string;
  fechaCreacion: string;
}