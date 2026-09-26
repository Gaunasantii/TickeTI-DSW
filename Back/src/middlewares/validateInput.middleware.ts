import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod/v3";
import { ValidationError } from "../utils/base.error.js";
import type { ZodObject } from "zod";
import type { IFieldError } from "../utils/api.response.js";

export const ValidationMiddleware=(Schema:ZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
    const result=Schema.safeParse(req);
    if(!result.success){
        const ListaErrores:IFieldError[]=result.error.issues.map(error=>({
            field:error.path[error.path.length-1]as string,
            error:error.message
        }))
        throw new ValidationError("Datos invalidos",ListaErrores)
    }
    req.body=result.data;
    next();
}