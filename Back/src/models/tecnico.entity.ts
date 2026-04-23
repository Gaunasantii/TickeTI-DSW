import { defineEntity, p } from '@mikro-orm/core';
import { PersonSchema } from './usuario.entity.js';

export const TecnicoSchema = defineEntity({
  name: 'tecnico',
  extends: PersonSchema,
  properties: {
  }
});

export class Tecnico extends TecnicoSchema.class {}
TecnicoSchema.setClass(Tecnico);