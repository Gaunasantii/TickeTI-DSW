// Back/src/middlewares/role.middleware.ts
import type { Response, NextFunction, Request } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/base.error.js';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!allowedRoles.includes(req.user.rol)) {
      throw new ForbiddenError('No tienes permisos para acceder a este recurso');
    }

    next();
  };
};