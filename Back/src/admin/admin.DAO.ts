import { orm } from "../config/db.js";
import { adminSchema } from "./admin.entity.js";

export class adminDAO {
  static async createAdmin(adminInput: any) {
    try {
      const em = orm.em.fork();
      const newAdmin = em.create(adminSchema, adminInput);
      em.persist(newAdmin);
      await em.flush();
      return newAdmin;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const adminRecovered = await em.findAll(adminSchema, filters);
      return adminRecovered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateAdmin(adminInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const adminFound = await em.findOneOrFail(adminSchema, filters);
      em.assign(adminFound, adminInput);
      await em.flush();
      return adminFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteAdmin(filters: any) {
    try {
      const em = orm.em.fork();
      const adminFound = await em.findOneOrFail(adminSchema, filters);
      em.remove(adminFound);
      await em.flush();
      return adminFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const adminFound = await em.findOneOrFail(adminSchema, filters);
      return adminFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}