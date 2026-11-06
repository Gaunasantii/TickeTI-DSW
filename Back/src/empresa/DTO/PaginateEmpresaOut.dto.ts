import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateEmpresaOutDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         cantPerPage:
 *           type: integer
 *           example: 10
 *         totalItems:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EmpresaOutDto'
 */

export const PaginateEmpresaOutSchema=zod.object({
    id:zod.number(),
    nombre:zod.string(),
    personas:zod.array(zod.object({
        dni:zod.string()
    })),
    admin:zod.array(zod.object({
        dni:zod.string(),
        name:zod.string(),
        surName:zod.string(),
        tele:zod.string(),
        mail:zod.string()
    })).max(1,"La empresa solo puede tener un administrador")
}).transform(({id,nombre,admin,personas})=>{

    const administrador = admin[0]

    return({

        id:id,
        nombre:nombre,
        nombreAdmin:administrador?`${administrador!.name} ${administrador!.surName}`:"No asignado",
        telAdmin:administrador?administrador!.mail:"No asignado",
        cantidadEmpleados:personas.length,
        admin: administrador || null,
    })
})

export type EmpresaPaginatedDto=zod.infer<typeof PaginateEmpresaOutSchema>