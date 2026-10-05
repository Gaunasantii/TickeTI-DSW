import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../utils/base.error.js";
import { orm } from "../config/DataBase/db.js";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token=req.cookies.AccessToken
  console.log("Cookie recibida:", token ? "SÍ hay token" : "NO hay token");

  if (!token) {
    throw new UnauthorizedError("Token de autenticación no proporcionado","No inicio sesion");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as any;
    if(req.user.empresa!=null){orm.em.setFilterParams('empresa',{bypass:false,empresa:req.user.empresa})}
    else{orm.em.setFilterParams('empresa',{bypass:true})};
    next();
  } catch (error: any) {
    console.error("Error verificando token:", error.message);
    throw new ForbiddenError("Token de autenticación inválido o expirado","El token fue modificado o expiro");
  }
};