import { orm } from "../config/db.js";
import { PersonSchema } from "../persona/person.entity.js";

export class authDAO{
  static async getUser(email:string,pass:string){
    const em=orm.em.fork()
    const user=await em.findOneOrFail(PersonSchema,{mail:email});
    if(!user || user.pass!=pass){
      throw new Error("Usuario o contraseña incorrectos");
    }
    return user;
  }
}