import { defineEntity, type EventArgs, type InferEntity, p } from '@mikro-orm/core';
import { TicketSchema } from './ticket.entity.js';
import { TecnicoSchema } from './tecnico.entity.js';

export const asignacionSchema = defineEntity({
  name:'asignacion',
  properties:{
    id:p.integer().primary().autoincrement(),
    fechaCreacion:p.datetime(),
    fechaCierre:p.datetime().nullable(),
    estado:p.boolean().default(true),
    ticket:()=>p.manyToOne(TicketSchema),
    tecnico:()=>p.manyToOne(TecnicoSchema),
  }
})

export class Asignacion extends asignacionSchema.class {}
asignacionSchema.setClass(Asignacion);


export type AsignacionType = InferEntity<typeof Asignacion>

asignacionSchema.addHook('beforeCreate',async(args:EventArgs<AsignacionType> )=>{
  const asignacion=args.entity;

  const fechaCreacion=new Date();

  asignacion.fechaCreacion=fechaCreacion;
})