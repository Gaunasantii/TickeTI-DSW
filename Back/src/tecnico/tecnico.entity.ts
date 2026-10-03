import { defineEntity, p } from '@mikro-orm/core';
import { PersonSchema } from '../persona/person.entity.js';
import { TicketSchema } from '../ticket/ticket.entity.js';
import { asignacionSchema } from '../asignacion/asignacion.entity.js';
import { EmpresaSchema } from '../empresa/empresa.entity.js';

export const TecnicoSchema = defineEntity({
    name:'tecnico',
    extends:PersonSchema,
    discriminatorValue:'tecnico',
    properties:{
        asignaciones:()=>p.oneToMany(asignacionSchema).mappedBy('tecnico'),
        empresa:()=> p.manyToOne(EmpresaSchema)
    }
})

export class Tecnico extends TecnicoSchema.class {}
TecnicoSchema.setClass(Tecnico);