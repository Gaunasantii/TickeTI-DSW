import { orm } from "../config/db.js";
import { UserSchema } from "../models/usuario.entity.js";

export class userDAO {
  static async createUser(userinput: any) {
    try {
      const em = orm.em.fork();
      const newUser = em.create(UserSchema, userinput);
      em.persist(newUser);
      await em.flush();
      return newUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const usersRecovered = await em.findAll(UserSchema, filters);
      return usersRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateUser(userinput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const userFound = await em.findOneOrFail(UserSchema, filters);

      em.assign(userFound, userinput);
      await em.flush();
      return userFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(filters: any) {
    try {
      const em = orm.em.fork();
      const userfound = await em.findOneOrFail(UserSchema, filters)
      em.remove(userfound);
      await em.flush();
      return userfound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const userfound = await em.findOneOrFail(UserSchema, filters)
      return userfound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}