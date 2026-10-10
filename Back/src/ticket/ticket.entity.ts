import { defineEntity , p, type EventArgs, type InferEntity } from "@mikro-orm/core";
import { UserSchema } from "../usuario/usuario.entity.js";
import { EstadoSchema } from "../estado/estado.entity.js";
import { PrioridadSchema } from "../prioridad/prioridad.entity.js";
import { CategoriaSchema } from '../categoria/categoria.entity.js';
import { TecnicoSchema } from "../tecnico/tecnico.entity.js";
import { asignacionSchema } from "../asignacion/asignacion.entity.js";
import { PersonSchema } from "../persona/person.entity.js";
import { EmpresaSchema } from "../empresa/empresa.entity.js";



export const TicketSchema = defineEntity({
    name:'ticket',
    properties:{
        id:p.integer().primary().autoincrement(),
        title:p.string(),
        description:p.string(),
        fechaCreacion:p.datetime(),
        solucion:p.string().nullable(),
        fechaCierre:p.datetime().nullable(),
        estado:() => p.manyToOne(EstadoSchema).deleteRule('set null'),
        prioridad:() => p.manyToOne(PrioridadSchema).deleteRule('set null'),
        categoria:() => p.manyToOne(CategoriaSchema).deleteRule('set null'),
        usuario:() => p.manyToOne(PersonSchema).deleteRule('cascade'),
        asignaciones:() => p.oneToMany(asignacionSchema).mappedBy('ticket'),
        empresa:()=> p.manyToOne(EmpresaSchema).deleteRule('cascade')
    }
})