import type { Request, Response } from "express";
import { PersonOutPaginatedSchema, type personPaginatedDto } from "./DTO/PersonPaginated.dto.js";
import type { PaginatedPersonInDto   } from "./DTO/PersonPaginatedQuery.dto.js";
import { PersonService } from "./person.service.js";
import { ApiPaginationResponse } from "../utils/api.response.js";
import { wrap } from "@mikro-orm/core";

export class PersonController{
    static async PaginateUserAndTecnicos(req:Request<any,any,any,PaginatedPersonInDto>, res:Response) {
        const { page, cantPerPage } = req.query;
        
        const {persons,total} = await PersonService.PaginateUserAndTecnicos(Number(page), Number(cantPerPage));
        const personsDto=persons.map(p=>PersonOutPaginatedSchema.parse(wrap(p).toJSON()));
        res.status(200).json(new ApiPaginationResponse<personPaginatedDto>(personsDto,{totalItems: total,totalPages: Math.ceil(total / Number(cantPerPage)),currentPage: Number(page),itemsPerPage: Number(cantPerPage)},"Paginado de personas recuperado"));
    }
}