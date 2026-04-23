import { defineEntity, p } from '@mikro-orm/core';

export const CategoriaSchema = defineEntity({
  name: 'categoria',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
  }
});

export class Categoria extends CategoriaSchema.class {}
CategoriaSchema.setClass(Categoria);