import { defineEntity, p } from '@mikro-orm/core';

export const PrioridadSchema = defineEntity({
  name: 'prioridad',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    tiempoLimiteResolucion: p.integer(), 
  }
});

export class Prioridad extends PrioridadSchema.class {}
PrioridadSchema.setClass(Prioridad);