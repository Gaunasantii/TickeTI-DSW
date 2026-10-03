import { orm } from "../config/DataBase/db.js";
import { PersonSchema } from "../persona/person.entity.js";

export class authDAO {
  static async getUser(email: string, pass: string) {
    const em = orm.em 
    const user = await em.findOne(PersonSchema, { mail: email },{ filters: { empresa: false }});
    return user;
  }
}