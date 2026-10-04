import { orm } from "../config/DataBase/db.js";
import { NotFoundError } from "../utils/base.error.js";
import { oficinaDAO } from "./oficina.DAO.js";

export class OficinaService {
  static async getAll() {
    return await oficinaDAO.findAll({});
  }

  static async createOficina(oficinaInput: any) {
    return await oficinaDAO.createOficina(oficinaInput);
  }

  static async deleteOficina(id: number) {
    const oficinaFound=await oficinaDAO.findOne({id:id})
    if(!oficinaFound)throw new NotFoundError("Oficina no encontrada",`Oficina con id ${id} no encontrada`)
    await oficinaDAO.deleteOficina(oficinaFound);
  }

  static async updateOficina(id: number, oficinaInput: any) {
    const oficinafound = await oficinaDAO.findOne({id:id})
     if(!oficinafound)throw new NotFoundError("Oficina no encontrada",`Oficina con id ${id} no encontrada`)
    return await oficinaDAO.updateOficina(oficinaInput,oficinafound)
  }

  static async getPaginado(page:number,cantPerPage:number){
    return await oficinaDAO.Paginated({},cantPerPage,page,{populate:['usuarios']});
  }
}