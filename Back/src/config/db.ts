import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import dotenv from 'dotenv';

import { TicketSchema } from '../models/ticket.entity.js'
import { UserSchema, PersonSchema } from '../models/usuario.entity.js'
import { EstadoSchema }    from '../models/estado.entity.js';
import { CategoriaSchema } from '../models/categoria.entity.js';
import { PrioridadSchema } from '../models/prioridad.entity.js';
import { EmpresaSchema }   from '../models/empresa.entity.js';
import { OficinaSchema }   from '../models/oficina.entity.js';
import { TecnicoSchema }   from '../models/tecnico.entity.js';

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
      entities: [UserSchema, PersonSchema, TicketSchema,
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
    console.log('DB conectada ✅')
  } catch (e) {
    console.error('Error al conectar DB ❌:', e)
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
/*
// Creamos la instancia de conexión
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nombre de la base de datos
    process.env.DB_USER,     // Tu usuario (ej: 'root')
    process.env.DB_PASSWORD, // Tu contraseña
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Para que no llene la consola de SQL
    }
);

// Función para probar la conexión y sincronizar
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL exitosa.');
        
        // Sincroniza los modelos con la DB (crea las tablas)
        await sequelize.sync({ alter: true });
        console.log('✅ Tablas sincronizadas correctamente.');
    } catch (error) {
        console.error('❌ Error de conexión a la base de datos:', error.message);
        process.exit(1); // Detiene la app si no hay base de datos
    }
};
*/
