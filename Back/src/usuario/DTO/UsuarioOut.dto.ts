import zod from 'zod'

export const UsuarioOutSchema=zod.object({
    dni: zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    oficina: zod.number()
})

export type UsuarioOutDto = zod.infer<typeof UsuarioOutSchema>;
