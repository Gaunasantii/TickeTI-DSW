import { defineEntity, p } from '@mikro-orm/core';
import { PersonSchema } from '../persona/person.entity.js';
import { adminSchema } from '../admin/admin.entity.js';

export const EmpresaSchema = defineEntity({
  name: 'empresa',
  properties: {
    id: p.integer().primary().autoincrement(),
    nombre: p.string(),
    personas: ()=>p.oneToMany(PersonSchema).mappedBy('empresa'),
    admin: ()=>p.oneToMany(adminSchema).mappedBy('empresa')
  }
});

export class Empresa extends EmpresaSchema.class {}
EmpresaSchema.setClass(Empresa);