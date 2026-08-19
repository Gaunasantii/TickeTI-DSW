import { orm } from "../config/db.js";
import { EstadoSchema } from "./estado.entity.js";

export class EstadoDAO {
  static async findAll(filters: any) {
    try {
      const em = orm.em.fork();
      const recoveredStates = await em.find(EstadoSchema, filters);
      return recoveredStates;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async findOne(filters: any) {
    try {
      const em = orm.em.fork();
      const foundState = await em.findOneOrFail(EstadoSchema, filters);
      return foundState;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createState(stateInput: any) {
    try {
      const em = orm.em.fork();
      const newState = em.create(EstadoSchema, stateInput);
      em.persist(newState);
      await em.flush();
      return newState;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateState(stateInput: any, filters: any) {
    try {
      const em = orm.em.fork();
      const stateToUpdate = await em.findOneOrFail(EstadoSchema, filters);
      em.assign(stateToUpdate, stateInput);
      await em.flush();
      return stateToUpdate;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteState(filters: any) {
    try {
      const em = orm.em.fork();
      const stateToDelete = await em.findOneOrFail(EstadoSchema, filters);
      em.remove(stateToDelete);
      await em.flush();
      return stateToDelete;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}