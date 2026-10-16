import { orm } from "../config/DataBase/db.js"; // copiá el import que use tu user.DAO.ts
import { PersonSchema } from "./person.entity.js";

export class personaDAO {
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