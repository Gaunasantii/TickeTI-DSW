import { IPaginadoParams } from "./IPaginado.params";

export interface IObtenerTicketsParams extends IPaginadoParams {
    estado?: number;
    categoria?: number;
}