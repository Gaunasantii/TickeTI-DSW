import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmpresaDto:
 *       type: object
 *       required:
 *         - razonSocial
 *         - cuit
 *       properties:
 *         razonSocial:
 *           type: string
 *           example: "Tech Solutions S.A."
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

export const CreateEmpresaSchema=zod.object({
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
    })
})

export type CreateEmpresaInDto=zod.infer<typeof CreateEmpresaSchema>["body"]