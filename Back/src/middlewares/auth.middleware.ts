import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../utils/base.error.js";

export interface AuthRequest extends Request {
  user?: {
    dni: string;
    rol: string;
    email: string;
    name: string;
    [key: string]: any;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token de autenticación no proporcionado");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded as any;
    next();
  } catch (error: any) {
    throw new ForbiddenError("Token de autenticación inválido o expirado");
  }
};