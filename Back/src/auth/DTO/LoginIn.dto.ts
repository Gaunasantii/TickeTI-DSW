import zod from 'zod'

export const LoginInSchema=zod.object({
    body:zod.object({
        pass:zod.string(),
        email:zod.email()
    })
})

export type LoginInDto=zod.infer<typeof LoginInSchema>["body"]