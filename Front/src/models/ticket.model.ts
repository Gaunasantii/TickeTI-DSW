
import { CategoriaModel } from "./categoria.model";
import { prioridadModel } from "./prioridad.model";
import { estadoModel } from "./estado.model";

export interface ticketPaginatedModel{
    id:number;
    title:string;
    description:string;
    estado:estadoModel|string;
    prioridad:prioridadModel|string;
    categoria:CategoriaModel|string;
    usuario:string;
    fechaCreacion:string;
    fechaCierre?:string;
    solucion?:string;
    estaTomado:boolean;
}