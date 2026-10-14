import zod from 'zod'

export const AsignacionOutSchema=zod.object({
    fechaCreacion: zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
    estado: zod.boolean(),
    ticket: zod.object({
        id:zod.number(),
          title:zod.string(),
          description:zod.string(),
          estado:zod.object({
            id:zod.number(),
            nombre:zod.string()
          }).nullable().transform((val)=>val?val:"Estado no asignado"),
          prioridad:zod.object({
            id:zod.number(),
            nombre:zod.string()
          }).nullable().transform((val)=>val?val:"Prioridad no asignada"),
          categoria:zod.object({
            id:zod.number(),
            nombre:zod.string()
          }).nullable().transform((val)=>val?val:"Categoria no asignada"),
        usuario:zod.string(),
        fechaCreacion:zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
    }),
    tecnico: zod.string(),
    id: zod.number(),
    fechaCierre: zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})).nullable()
})

export type AsignacionDto=zod.infer<typeof AsignacionOutSchema>