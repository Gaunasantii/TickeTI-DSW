import { defineEntity, p } from '@mikro-orm/core';

export const EstadoSchema = defineEntity({
  name: 'estado',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    descripcion: p.string(),
  }
});

export class Estado extends EstadoSchema.class {}
EstadoSchema.setClass(Estado);