import { orm } from "../config/db.js";
import { defineEntity , p, type EventArgs, type InferEntity } from "@mikro-orm/core";
import { TicketSchema } from "./ticket.entity.js";
import { OficinaSchema } from './oficina.entity.js';
import { PersonSchema } from "./Shared/person.entity.js";


export const UserSchema = defineEntity({
    name:'user',
    extends:PersonSchema,
    discriminatorValue:"user",
    properties:{
        tickets:() => p.oneToMany(TicketSchema).mappedBy('usuario').nullable(), // este es el lado del dueño
        oficina:()=>p.manyToOne(OficinaSchema).inversedBy('usuarios').nullable(), //este es el lado de quien tendra la foreanKey
    }
});

