import type { ICreatePersonRequest } from "./ICreatePersonRequest";

export interface ICreateEmpresaRequest {
    nombre: string;
    admin: ICreatePersonRequest;
}