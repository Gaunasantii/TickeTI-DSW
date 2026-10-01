import { type Options } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import dotenv from 'dotenv';


//esto esta aca porque no funcionaba utilizando ruta relativa de entidades
import { TicketSchema } from "../../ticket/ticket.entity.js";
import { UserSchema } from "../../usuario/usuario.entity.js";
import { EstadoSchema } from "../../estado/estado.entity.js";
import { CategoriaSchema } from '../../categoria/categoria.entity.js';
import { PrioridadSchema } from "../../prioridad/prioridad.entity.js";
import { EmpresaSchema } from '../../empresa/empresa.entity.js';
import { OficinaSchema } from "../../oficinas/oficina.entity.js";
import { TecnicoSchema } from "../../tecnico/tecnico.entity.js";
import { adminSchema } from "../../admin/admin.entity.js";
import { PersonSchema } from "../../persona/person.entity.js";
import { asignacionSchema } from "../../asignacion/asignacion.entity.js";
import { SeedManager } from "@mikro-orm/seeder";

dotenv.config();

const options:Options={
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
      extensions:[SeedManager],
      seeder:{
        path:'./dist/config/DataBase/seeders',
        pathTs:'./src/config/DataBase/seeders',
        defaultSeeder:'DatabaseSeeder',
        glob: '!(*.d).{js,ts}'
      },
      filters:{
        empresa:{cond:args=>{
          if (args.bypass) {
            return {};
          }
          return { empresa: args.empresa }
        },
        default:true,
        entity:[
          'tecnico'
          ,'user'
          ,'oficina'
          ,'estado'
          ,'prioridad'
          ,'asignacion'
          ,'categoria'
          ,'ticket']}
      }
    }

export default options