/**
 * @openapi
 * components:
 *   schemas:
 *     FieldError:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *           example: email
 *         error:
 *           type: string
 *           example: El campo email es obligatorio
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         currentPage:
 *           type: number
 *         itemsPerPage:
 *           type: number
 *         totalItems:
 *           type: number
 *         totalPages:
 *           type: number
 * 
 *     
 *     ApiResponseSucces:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operacion exitosa
 * 
 *     ApiResponseError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error en la operacion
 */

interface IApiResponse<T> {
    data: T|T[];
    message?:string;
    errors?:string[]|string|IFieldError[];
    success?:boolean;
    meta?:IPaginationMeta;
}

export interface IFieldError{
    field:string,
    error:string,
}

export interface IPaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class ApiSuccessResponse<T> implements IApiResponse<T>{
    public success=true;
    
    constructor(public data:T, public message:string){}
    
}

export class ApiPaginationResponse<T> implements IApiResponse<T>{
    public success=true;
    constructor(
        public data:T[],
        public meta:IPaginationMeta,
        public message:string
    ) {}
}

export class ApiErrorResponse implements IApiResponse<null>{
    public success=false;
    public data=null;
    constructor(public errors:string[]|string|IFieldError[], public message:string){}
}