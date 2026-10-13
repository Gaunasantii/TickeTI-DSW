import { ICreatePersonRequest } from "../requests/ICreatePersonRequest";
import { PersonModel } from "./person.model";

export interface EmpresaPaginatedModel {
  id: number;
  nombre: string;
  nombreAdmin: string;
  telAdmin: string;
  cantidadEmpleados: number;
  admin:ICreatePersonRequest | null;
}