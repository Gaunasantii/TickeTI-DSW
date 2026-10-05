import { defineEntity, p } from '@mikro-orm/core';
import { EmpresaSchema } from '../empresa/empresa.entity.js';

export const EstadoSchema = defineEntity({
  name: 'estado',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    descripcion: p.string(),
    empresa:()=> p.manyToOne(EmpresaSchema)
  }
});

export class Estado extends EstadoSchema.class {}
EstadoSchema.setClass(Estado);