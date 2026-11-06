import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PersonPaginatedDto:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 25
 *         persons:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "47107024"
 *               nombre:
 *                 type: string
 *                 example: "Santiago"
 *               apellido:
 *                 type: string
 *                 example: "Gauna"
 *               type:
 *                 type: string
 *                 enum: [user, tecnico]
 *                 example: "user"
 *               oficina:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Soporte Técnico"
 */

export const PersonOutPaginatedSchema=zod.object({
    dni:zod.string(),
    surName: zod.string(),
    name: zod.string(),
    tele: zod.string(),
    mail: zod.string(),
    type: zod.string(),
    oficina:zod.object({
        id:zod.number(),
        nombre:zod.string()
    }).nullable().transform(o=>{
        if(!o){
            return "No asignada"
        }
        return o.nombre
    })
})

export type personPaginatedDto=zod.infer<typeof PersonOutPaginatedSchema>;