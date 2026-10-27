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

    static async findOne(filters: any) {
        const em = orm.em.fork();
        return await em.findOne(PersonSchema, filters);
    }

    static async updatePassword(dni: string, nuevaPass: string) {
        const em = orm.em.fork();
        const persona = await em.findOneOrFail(PersonSchema, { dni });
        persona.pass = nuevaPass;
        await em.flush();
    }
}