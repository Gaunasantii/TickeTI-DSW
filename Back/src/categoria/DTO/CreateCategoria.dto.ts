import zod from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCategoriaDto:
 *      type: object
 *      required:
 *          - nombre
 *      properties:
 *          nombre:
 *              type: string
 *              description: El nombre de la nueva categoria
 *              example: Hardware
 */

export const CreateCategoriaSchema=zod.object({
    body:zod.object({
        nombre:zod.string().nonempty()
    })
})

export type CreateCategoriaInDto=zod.infer<typeof CreateCategoriaSchema>["body"]