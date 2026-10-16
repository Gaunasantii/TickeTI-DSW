import { NotFoundError, ValidationError } from "../utils/base.error.js";
import { personaDAO } from "./persona.DAO.js";

export class PersonaService {
  static async changePassword(dni: string, passwordActual: string, passwordNueva: string) {
    const persona = await personaDAO.findOne({ dni });
    if (!persona) throw new NotFoundError("Persona no encontrada");

    if (persona.pass !== passwordActual) {
      throw new ValidationError("La contraseña actual es incorrecta");
    }
    if (passwordActual === passwordNueva) {
      throw new ValidationError("La nueva contraseña debe ser distinta a la actual");
    }

    await personaDAO.updatePassword(dni, passwordNueva);
  }
}