import { PersonDAO } from './person.DAO.js';

export class PersonService{
    static async PaginateUserAndTecnicos(page: number, cantPerPage: number) {
        return await PersonDAO.PaginatePersons(page,cantPerPage,{type:{$in:['user','tecnico']}},{populate:['oficina']})
    }   
}