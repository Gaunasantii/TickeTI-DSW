import zod from 'zod'

export const AsignacionOutSchema=zod.object({
    fechaCreacion: zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})),
    estado: zod.boolean(),
    ticket: zod.number(),
    tecnico: zod.string(),
    id: zod.number(),
    fechaCierre: zod.date().transform((date)=>date.toLocaleString('es-AR',{timeZone:'America/Argentina/Buenos_Aires'})).nullable()
})

export type AsignacionDto=zod.infer<typeof AsignacionOutSchema>