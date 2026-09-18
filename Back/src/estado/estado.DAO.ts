import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { EstadoSchema } from "./estado.entity.js";

export class EstadoDAO {
  static async findAll(filters: any) {
      const em = orm.em.fork();
      const recoveredStates = await em.find(EstadoSchema, filters);
      return recoveredStates;
  }

  static async findOne(filters: any) {
      const em = orm.em.fork();
      const foundState = await em.findOne(EstadoSchema, filters);
      return foundState;
  }

  static async createState(stateInput: any) {
      const em = orm.em.fork();
      const newState = em.create(EstadoSchema, stateInput);
      em.persist(newState);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newState;
  }

  static async updateState(stateInput: any, stateFound: any) {
      const em = orm.em.fork();
      em.assign(stateFound, stateInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return stateFound;
  }

  static async deleteState(filters: any) {
      const em = orm.em.fork();
      const stateToDelete = await em.findOneOrFail(EstadoSchema, filters);
      em.remove(stateToDelete);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return stateToDelete;
  }
}