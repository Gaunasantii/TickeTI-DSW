import zod from 'zod'

export const PersonOutPaginatedSchema=zod.object({
    dni:zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    type: zod.string(),
    oficina:zod.object({
        id:zod.number(),
        nombre:zod.string()
    }).transform(o=>o.nombre).nullable()
})

export type personPaginatedDto=zod.infer<typeof PersonOutPaginatedSchema>;