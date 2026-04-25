import { PersonSchema } from "./Shared/person.entity.js";
import { defineEntity } from "@mikro-orm/core";

export const adminSchema = defineEntity({
  name:'admin',
  extends:PersonSchema,
  discriminatorValue:'admin',
  properties:{}
})