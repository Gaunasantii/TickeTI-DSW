// Back/src/middlewares/role.middleware.ts
import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './auth.middleware.js';
import { ForbiddenError, UnauthorizedError } from '../utils/base.error.js';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!allowedRoles.includes(req.user!.rol)) {
      throw new ForbiddenError('No tienes permisos para acceder a este recurso');
    }

    next();
  };
};