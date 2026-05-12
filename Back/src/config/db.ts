import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import dotenv from 'dotenv';

import { TicketSchema } from '../models/ticket.entity.js'
import { UserSchema} from '../models/usuario.entity.js'
import { EstadoSchema }    from '../models/estado.entity.js';
import { CategoriaSchema } from '../models/categoria.entity.js';
import { PrioridadSchema } from '../models/prioridad.entity.js';
import { EmpresaSchema }   from '../models/empresa.entity.js';
import { OficinaSchema }   from '../models/oficina.entity.js';
import { TecnicoSchema }   from '../models/tecnico.entity.js';
import { adminSchema } from "../models/admin.entity.js";
import { PersonSchema } from "../models/Shared/person.entity.js";

dotenv.config();

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
})

export let orm:MikroORM;

export async function initOrm() {
  try {
    orm = await MikroORM.init({
      entities: [PersonSchema,UserSchema,adminSchema , TicketSchema,
      EstadoSchema, CategoriaSchema, PrioridadSchema,
      EmpresaSchema, OficinaSchema, TecnicoSchema,
    ],
      //entitiesTs: ['src/**/*.entity.ts'],
      dbName: process.env.DB_NAME as string,
      driver: MySqlDriver,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT),
    })
  } catch (e) {
    process.exit(1)
  }
}


export const syncSchema = async ()=>{
    const generator = orm.schema;
    await generator.update()
}

export const  checkDb=async ()=> {
  try {
    await orm.isConnected()
    console.log('DB conectada ✅')
  } catch (e) {
    console.error('DB no conectada ❌', e)
  }
}
