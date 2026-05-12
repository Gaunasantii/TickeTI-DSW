import { defineEntity, p } from '@mikro-orm/core';
import { EmpresaSchema } from './empresa.entity.js';
import { UserSchema } from './usuario.entity.js';

export const OficinaSchema = defineEntity({
  name: 'oficina',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    empresa: () => p.manyToOne(EmpresaSchema),
    usuarios: () => p.oneToMany(UserSchema).mappedBy('oficina'),
  }
});

export class Oficina extends OficinaSchema.class {}
OficinaSchema.setClass(Oficina);