import { defineEntity, p } from '@mikro-orm/core';
import { EmpresaSchema } from '../empresa/empresa.entity.js';

export const CategoriaSchema = defineEntity({
  name: 'categoria',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    empresa:()=> p.manyToOne(EmpresaSchema)
  }
});

export class Categoria extends CategoriaSchema.class {}
CategoriaSchema.setClass(Categoria);