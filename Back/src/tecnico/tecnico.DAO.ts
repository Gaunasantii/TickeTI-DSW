import { orm } from "../config/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { TecnicoSchema } from "./tecnico.entity.js";

export class tecnicoDAO {
  static async createTecnico(tecnicoInput: any) {
      const em = orm.em;
      const newTecnico = em.create(TecnicoSchema, tecnicoInput);
      em.persist(newTecnico);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newTecnico;
  }

  static async findAll(filters: any) {
      const em = orm.em;
      const tecnicoRecovered = await em.findAll(TecnicoSchema, filters);
      return tecnicoRecovered;
  }

  static async updateTecnico(tecnicoInput: any, tecnicoToUpdate:any) {
      const em = orm.em;
      em.assign(tecnicoToUpdate, tecnicoInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return tecnicoToUpdate;
  }

  static async deleteTecnico(tecnicoToDelete:any) {
      const em = orm.em;
      em.remove(tecnicoToDelete);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return tecnicoToDelete;
  }

  static async findOne(filters: any) {
      const em = orm.em;
      const tecnicoFound = await em.findOne(TecnicoSchema, filters);
      return tecnicoFound;
  }
}