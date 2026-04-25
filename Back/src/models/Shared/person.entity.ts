import { defineEntity , p, type EventArgs, type InferEntity } from "@mikro-orm/core";


export const PersonSchema=defineEntity({
    name:'person',
    discriminatorColumn:"type",
    properties:{
        dni:p.string().primary(),
        surName:p.string(),
        name:p.string(),
        tele:p.string(),
        mail:p.string(),
        pass:p.string(),
        type:p.string(),
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