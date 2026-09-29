import zod from 'zod'

export const LoginOutSchema=zod.object({
    name:zod.string(),
    dni:zod.string(),
    type:zod.string()
})

export type LoginDto=zod.infer<typeof LoginOutSchema>