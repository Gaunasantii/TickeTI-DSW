import zod from 'zod'

export const TecnicoOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string()
})

export type TecnicoOutDto = zod.infer<typeof TecnicoOutSchema>;