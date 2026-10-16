import { type Request, type Response } from "express";
import { PersonaService } from "./persona.service.js";
import { ApiSuccessResponse } from "../utils/api.response.js";
import { UnauthorizedError } from "../utils/base.error.js";
import type { ChangePasswordBodyDTO } from "./DTO/ChangePassword.dto.js";

class personaController {
  async changePassword(req: Request<any, any, ChangePasswordBodyDTO>, res: Response) {
    const dni = req.user?.dni;
    const { passwordActual, passwordNueva } = req.body;

    if (!dni) {
      throw new UnauthorizedError("El token no contiene el DNI del usuario");
    }

    await PersonaService.changePassword(dni, passwordActual, passwordNueva);

    res.status(200).json(new ApiSuccessResponse<null>(null, "Contraseña actualizada con éxito"));
  }
}

export const personacontroller = new personaController();