import type { NextFunction, Request,Response, } from "express";
import { ValidationError,UnauthorizedError, NotFoundError, DatabaseError, ConflictError,AppError, ForbiddenError  } from "../utils/base.error.js";
import { ApiErrorResponse } from "../utils/api.response.js";

export const ErrorHander=(err:Error,req:Request,res:Response,next:NextFunction)=>
    {

    if(err instanceof AppError){
        let statusCode=500;

        switch(err.constructor){
            case(ValidationError):
                statusCode=400;
                break;
            case(NotFoundError):
                statusCode=404;
                break;
            case(ConflictError):
                statusCode=409;
                break;
            case(UnauthorizedError):
                statusCode=401;
                break;
            case(ForbiddenError):
                statusCode=403;
                break;
        }

        return res.status(statusCode).json(new ApiErrorResponse(err.message,(err as any).details))
    }

    console.log("Error no controlado:",err);

    return res.status(500).json("Error interno del servidor");
}