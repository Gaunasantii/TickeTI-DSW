import { orm } from "../config/DataBase/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { PersonSchema } from "./person.entity.js";

export class PersonDAO{
    static async PaginatePersons(page: number, cantPerPage: number,filters:any,options:any) {
        const em=orm.em;
        const [persons,total]=await em.findAndCount(PersonSchema,filters,{
            offset: (page-1)*cantPerPage,
            limit: cantPerPage,
            ...options
        })
        return { persons, total };
    }
}