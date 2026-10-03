import { defineEntity, p } from '@mikro-orm/core';
import { EmpresaSchema } from '../empresa/empresa.entity.js';

export const PrioridadSchema = defineEntity({
  name: 'prioridad',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    tiempoLimiteResolucion: p.integer(), 
    empresa:()=> p.manyToOne(EmpresaSchema)
  }
});

export class Prioridad extends PrioridadSchema.class {}
PrioridadSchema.setClass(Prioridad);