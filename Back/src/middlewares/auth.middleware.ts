import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
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
    return res.status(401).json({ message: "Token de acceso no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(403).json({
      message: "Token inválido o expirado",
      detalle: error.message,
    });
  }
};