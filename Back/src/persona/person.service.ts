import { PersonDAO } from './person.DAO.js';
import { NotFoundError, ValidationError } from '../utils/base.error.js';

export class PersonService{
    static async PaginateUserAndTecnicos(page: number, cantPerPage: number) {
        return await PersonDAO.PaginatePersons(page,cantPerPage,{type:{$in:['user','tecnico']}},{populate:['oficina']})
    }

  static async changePassword(dni: string, passwordActual: string, passwordNueva: string) {
    const persona = await PersonDAO.findOne({ dni });
    if (!persona) throw new NotFoundError("Persona no encontrada");

    if (persona.pass !== passwordActual) {
      throw new ValidationError("La contraseña actual es incorrecta");
    }
    if (passwordActual === passwordNueva) {
      throw new ValidationError("La nueva contraseña debe ser distinta a la actual");
    }

    await PersonDAO.updatePassword(dni, passwordNueva);
  }
}