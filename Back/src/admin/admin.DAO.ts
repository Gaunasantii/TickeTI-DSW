import { orm } from "../config/db.js";
import { ConflictError, DatabaseError, NotFoundError } from "../utils/base.error.js";
import { adminSchema } from "./admin.entity.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";

export class adminDAO {
  static async createAdmin(adminInput: any) {
      const em = orm.em.fork();
      const newAdmin = em.create(adminSchema, adminInput);
      em.persist(newAdmin);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newAdmin;
  }

  static async findAll(filters: any) {
      const em = orm.em.fork();
      const adminRecovered = await em.findAll(adminSchema, filters);
      return adminRecovered;
  }

  static async updateAdmin(adminInput: any,adminFound:any) {
      const em = orm.em.fork();
      em.assign(adminFound, adminInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return adminFound;
    
  }

  static async deleteAdmin(admin: any) {
      const em = orm.em.fork();
      em.remove(admin);
      await em.flush();
      return admin;
  }

  static async findOne(filters: any) {
      const em = orm.em.fork();
      const adminFound = await em.findOne(adminSchema, filters);
      return adminFound;
  }
}