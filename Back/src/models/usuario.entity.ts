import { orm } from "../config/db.js";
import { defineEntity , p, type EventArgs, type InferEntity } from "@mikro-orm/core";
import { TicketSchema } from "./ticket.entity.js";
import { OficinaSchema } from './oficina.entity.js';


export const PersonSchema=defineEntity({
    name:'person',
    properties:{
        dni:p.string().primary(),
        surName:p.string(),
        name:p.string(),
        tele:p.string(),
        mail:p.string(),
        isAdmin:p.boolean().default(false),
        isTechnician:p.boolean().default(false)
    },
});


export class Person extends PersonSchema.class {}
PersonSchema.setClass(Person);


export type PersonType = InferEntity<typeof PersonSchema>

PersonSchema.addHook('beforeCreate',async(args:EventArgs<PersonType> )=>{
    const person=args.entity;

    const InitialNameLetter=person.name[0]?.toLowerCase();

    const baseMail=InitialNameLetter+person.surName.substring(0,5).toLowerCase();

    const count=await args.em.count(PersonSchema,{mail:{$like:`${baseMail}%`}});

    person.mail=baseMail+String(count)+"@ticketi.com";
})


export const UserSchema = defineEntity({
    name:'user',
    extends:PersonSchema,
    properties:{
        tickets: () => p.oneToMany(TicketSchema).mappedBy('usuario'), // este es el lado del dueño
        oficina:()=>p.manyToOne(OficinaSchema).inversedBy('usuarios'), //este es el lado de quien tendra la foreanKey
        pass:p.string(),
    }
})

