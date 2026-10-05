import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import dotenv from 'dotenv';


//esto esta aca porque no funcionaba utilizando ruta relativa de entidades
import { TicketSchema } from "../ticket/ticket.entity.js";
import { UserSchema } from "../usuario/usuario.entity.js";
import { EstadoSchema } from "../estado/estado.entity.js";
import { CategoriaSchema } from '../categoria/categoria.entity.js';
import { PrioridadSchema } from "../prioridad/prioridad.entity.js";
import { EmpresaSchema } from '../empresa/empresa.entity.js';
import { OficinaSchema } from "../oficinas/oficina.entity.js";
import { TecnicoSchema } from "../tecnico/tecnico.entity.js";
import { adminSchema } from "../admin/admin.entity.js";
import { PersonSchema } from "../persona/person.entity.js";
import { asignacionSchema } from "../asignacion/asignacion.entity.js";

dotenv.config();

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
})

export let orm: MikroORM;

export async function initOrm() {
  try {
    orm = await MikroORM.init({
      entities: [PersonSchema, UserSchema, adminSchema, TicketSchema,
        EstadoSchema, CategoriaSchema, PrioridadSchema,
        EmpresaSchema, OficinaSchema, TecnicoSchema, asignacionSchema
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


export const syncSchema = async () => {
  const generator = orm.schema;
  await generator.update()
}

export const checkDb = async () => {
  try {
    await orm.isConnected()
    console.log('DB conectada correctamente')
  } catch (e) {
    console.error('DB no conectada', e)
  }
}
