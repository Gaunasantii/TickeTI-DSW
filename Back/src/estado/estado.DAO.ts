import { orm } from "../config/DataBase/db.js";
import { mapDbErrorToAppError } from "../utils/DbErrorMapper.js";
import { EstadoSchema } from "./estado.entity.js";

export class EstadoDAO {
  static async findAll(filters: any) {
      const em = orm.em ;
      const recoveredStates = await em.find(EstadoSchema, filters);
      return recoveredStates;
  }

  static async findOne(filters: any) {
      const em = orm.em ;
      const foundState = await em.findOne(EstadoSchema, filters);
      return foundState;
  }

  static async createState(stateInput: any) {
      const em = orm.em ;
      const newState = em.create(EstadoSchema, stateInput);
      em.persist(newState);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return newState;
  }

  static async updateState(stateInput: any, stateFound: any) {
      const em = orm.em ;
      em.assign(stateFound, stateInput);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return stateFound;
  }

  static async createInitialStates(idEmpresa:number) {
      const em = orm.em ;
      await em.create(EstadoSchema,{
                nombre: "Abierto",
                descripcion: "Ticket recién creado, pendiente de revisión",
                esEstadoInicial: true,
                empresa:idEmpresa
      });

      await em.create(EstadoSchema,{
                nombre: "Cerrado",
                descripcion: "Ticket cerrado",
                esEstadoFinal:true,
                empresa:idEmpresa
      });

      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
      return;
  }

  static async getEstadosPaginated(filters:any,page:number,limit:number){
      const em = orm.em ;
      const [estados, total] = await em.findAndCount(EstadoSchema, filters, {
          limit: limit,
          offset: (page - 1) * limit
      });
      return {estados,total};
  }

  static async delete(estado:any) {
      const em = orm.em ;
      em.remove(estado);
      await em.flush().catch((error:any)=>mapDbErrorToAppError(error));
  }
}