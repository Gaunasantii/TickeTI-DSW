import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyEmpresaDto:
 *       type: object
 *       properties:
 *         razonSocial:
 *           type: string
 *           example: "Tech Solutions S.R.L."
 *         cuit:
 *           type: string
 *           example: "30-71234567-8"
 */

const AdminInputSchema=zod.object({
            dni:zod.string().min(8).regex(/^\d+$/,"Solo se admiten numeros"),
            surName:zod.string().max(64),
            name:zod.string().max(64),
            tele: zod.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
            pass:zod.string().min(6)
})

export const ModifyEmpresaSchema=zod.object({
    body:zod.object({
            nombre:zod.string().nonempty(),
            admin: zod.preprocess((val)=>{
    
                if (!val || typeof val !== "object") return undefined;
    
                const hasAnyEmpty = Object.values(val).some(
                    (v) => v === "" || v === undefined || v === null
                );
    
                if (hasAnyEmpty) return undefined;
                return val;
            },AdminInputSchema.transform((val) => val ?? undefined).optional())
        }),
    params:zod.object({
        id:zod.string().regex(/^\d+$/, "El ID debe ser numérico")
    })
})

export type ModifyEmpresaSchemaInParamsDto=zod.infer<typeof ModifyEmpresaSchema>["params"]
export type ModifyEmpresaSchemaInBodyDto=zod.infer<typeof ModifyEmpresaSchema>["body"]