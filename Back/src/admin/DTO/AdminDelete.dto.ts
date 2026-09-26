import zod from 'zod'

export const DeleteAdminSchema=zod.object({
    params:zod.object({
            dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
        })
})