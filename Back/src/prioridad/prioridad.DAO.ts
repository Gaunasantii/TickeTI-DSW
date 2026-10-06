import { orm } from "../config/DataBase/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { PrioridadSchema } from "./prioridad.entity.js";

export class prioridadDAO {
  static async findAll(filters: any) {
    const em = orm.em ;
    const prioridadRecovered = await em.find(PrioridadSchema, filters);
    return prioridadRecovered;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const prioridadFound = await em.findOne(PrioridadSchema, filters);
      return prioridadFound;
  }

  static async createPrioridad(prioridadInput: any) {
      const em = orm.em ;
      const newPrioridad = em.create(PrioridadSchema, prioridadInput);
      em.persist(newPrioridad);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newPrioridad;
  }

  static async updatePrioridad(prioridadInput: any, prioridadFound:any) {
      const em = orm.em ;
      em.assign(prioridadFound, prioridadInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return prioridadFound;
  }

  static async deletePrioridad(prioridadFound:any) {
      const em = orm.em ;
      em.remove(prioridadFound);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
  }

  static async createInitialPrioridades(idEmpresa:number) {
      const em = orm.em ;
      await em.create(PrioridadSchema,{
                nombre: "Alta",
                tiempoLimiteResolucion: 86400, 
                empresa:idEmpresa
      });

      await em.create(PrioridadSchema,{
                nombre: "Media",
                tiempoLimiteResolucion: 259200, 
                empresa:idEmpresa
      });

      await em.create(PrioridadSchema,{
                nombre: "Baja",
                tiempoLimiteResolucion: 432000, 
                empresa:idEmpresa
      });

      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return;
  }
}