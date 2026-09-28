import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod/v3";
import { ValidationError } from "../utils/base.error.js";
import type { ZodObject } from "zod";
import type { IFieldError } from "../utils/api.response.js";

export const ValidationMiddleware=(Schema:ZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
    const result=Schema.safeParse({body:req.body,query:req.query,params:req.params});
    if(!result.success){
        const ListaErrores:IFieldError[]=result.error.issues.map(error=>({
            field:error.path[error.path.length-1]as string,
            error:error.message
        }))
        throw new ValidationError("Datos invalidos",ListaErrores)
    }
    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params as any;
    if (result.data.query) req.query = result.data.query as any;
    next();
}