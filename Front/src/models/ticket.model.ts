export interface ticketPaginatedModel{
    id:number;
    title:string;
    description:string;
    estado:number;
    prioridad:number;
    categoria:number;
    usuario:string;
    fechaCreacion:string;
    fechaCierre?:string;
    solucion?:string;
}