import zod from 'zod'

export const ModifyAdminSchema=zod.object({
    body:zod.object({
        surName:zod.string().max(64),
        name:zod.string().max(64),
        tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
    }),
    params:zod.object({
        dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros")
    })
})

export type ModifyAdminBodyDTO = zod.infer<typeof ModifyAdminSchema>["body"];


export type ModifyAdminParamsDTO = zod.infer<typeof ModifyAdminSchema>["params"];