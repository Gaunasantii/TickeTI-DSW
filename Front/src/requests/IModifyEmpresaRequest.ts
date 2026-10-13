import { ICreatePersonRequest } from "./ICreatePersonRequest";

export interface IModifyEmpresaRequest {
    id:string;
    nombre: string;
    admin: ICreatePersonRequest;
}