import zod from 'zod'

export const AdminOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string()
})

export type AdminOutDto = zod.infer<typeof AdminOutSchema>;