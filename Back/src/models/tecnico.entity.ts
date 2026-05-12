import { defineEntity, p } from '@mikro-orm/core';
import { PersonSchema } from './Shared/person.entity.js';
import { TicketSchema } from './ticket.entity.js';

export const TecnicoSchema = defineEntity({
    name:'tecnico',
    extends:PersonSchema,
    discriminatorValue:'tecnico',
    properties:{
        ticket: () => p.manyToMany(TicketSchema).mappedBy('tecnico'),
    }
})

export class Tecnico extends TecnicoSchema.class {}
TecnicoSchema.setClass(Tecnico);