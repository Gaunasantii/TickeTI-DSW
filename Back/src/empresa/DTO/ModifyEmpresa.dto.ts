import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     ModifyEmpresaDto:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 1
 *           example: 'Empresa S.A.'
 *         admin:
 *           type: object
 *           properties:
 *             dni:
 *               type: string
 *               minLength: 8
 *               pattern: '^\d+$'
 *               example: '12345678'
 *             surName:
 *               type: string
 *               maxLength: 64
 *               example: 'Doe'
 *             name:
 *               type: string
 *               maxLength: 64
 *               example: 'John'
 *             tele:
 *               type: string
 *               pattern: '^\+?[1-9]\d{1,14}$'
 *               example: '+1234567890'
 *             pass:
 *               type: string
 *               format: password
 *               minLength: 6
 *               example: 'password123'
 *           required:
 *             - dni
 *             - surName
 *             - name
 *             - tele
 *             - pass
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