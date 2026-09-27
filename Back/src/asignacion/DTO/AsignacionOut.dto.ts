import zod from 'zod'

export const AsignacionOutSchema=zod.object({
    fechaCreacion: zod.date(),
    estado: zod.boolean(),
    ticket: zod.number(),
    tecnico: zod.string(),
    id: zod.number(),
    fechaCierre: zod.date().nullable()
})

export type AsignacionDto=zod.infer<typeof AsignacionOutSchema>