
export class AppError extends Error{

    public readonly details:any;
    
    constructor(message:string,details?:any){
        super(message);
        this.name=this.constructor.name;
        this.details=details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {}
export class ValidationError extends AppError {}
export class ConflictError extends AppError {} 
export class DatabaseError extends AppError {}
export class UnauthorizedError extends AppError {}
export class ForbiddenError extends AppError {}