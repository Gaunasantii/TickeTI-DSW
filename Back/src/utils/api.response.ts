interface IApiResponse<T> {
    data: T|T[];
    message?:string;
    errors?:string[]|string;
    success?:boolean;
    meta?:IPaginationMeta;
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
    constructor(public errors:string[]|string, public message:string){}
}