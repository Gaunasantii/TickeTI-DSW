import { defineEntity, p } from '@mikro-orm/core';
import { PersonSchema } from '../persona/person.entity.js';
import { TicketSchema } from '../ticket/ticket.entity.js';
import { asignacionSchema } from '../asignacion/asignacion.entity.js';

export const TecnicoSchema = defineEntity({
    name:'tecnico',
    extends:PersonSchema,
    discriminatorValue:'tecnico',
    properties:{
        //ticket: () => p.manyToMany(TicketSchema).mappedBy('tecnico'),
        asignaciones:()=>p.oneToMany(asignacionSchema).mappedBy('tecnico')
    }
})

export class Tecnico extends TecnicoSchema.class {}
TecnicoSchema.setClass(Tecnico);