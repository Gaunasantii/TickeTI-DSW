import { defineEntity, p } from '@mikro-orm/core';

export const EmpresaSchema = defineEntity({
  name: 'empresa',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
  }
});

export class Empresa extends EmpresaSchema.class {}
EmpresaSchema.setClass(Empresa);