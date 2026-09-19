import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { UserSchema } from "./usuario.entity.js";

export class userDAO {
  static async createUser(userinput: any) {
      const em = orm.em ;
      const newUser = em.create(UserSchema, userinput);
      em.persist(newUser);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newUser;
  }

  static async findAll(filters: any) {
      const em = orm.em ;
      const usersRecovered = await em.findAll(UserSchema, filters);
      return usersRecovered;
    
  }

  static async updateUser(userinput: any, userFound:any) {
      const em = orm.em ;
      em.assign(userFound, userinput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return userFound;
  }

  static async deleteUser(userfound:any) {
      const em = orm.em ;
      em.remove(userfound);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return userfound;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const userfound = await em.findOne(UserSchema, filters)
      return userfound;
  }
}