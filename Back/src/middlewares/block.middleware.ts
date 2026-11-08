
import type{ Request, Response, NextFunction } from "express";
const blockEndpoint = (req: Request, res: Response, next: NextFunction) => {
  return res.status(405).json({
    status: "Method Not Allowed",
    message: "Acceso denegado. Este endpoint ha sido anulado por motivos de obsolescencia."
  });
};

export default blockEndpoint;