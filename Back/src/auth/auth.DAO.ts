import { orm } from "../config/db.js";
import { PersonSchema } from "../persona/person.entity.js";

export class authDAO {
  static async getUser(email: string, pass: string) {
    const em = orm.em.fork()
    const user = await em.findOne(PersonSchema, { mail: email });
    return user;
  }
}