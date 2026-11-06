import zod from 'zod'

/**
 * @openapi
 * components:
 *   schemas:
 *     PaginateAsignacionQueryDto:
 *       type: object
 *       required:
 *         - page
 *         - cantPerPage
 *       properties:
 *         page:
 *           type: string
 *           example: "1"
 *         cantPerPage:
 *           type: string
 *           example: "10"
 */

export const PaginateAsignacionQuerySchema = zod.object({
    query:zod.object({
        page: zod.string().regex(/^\d+$/),
        cantPerPage: zod.string().regex(/^\d+$/),
    })
});

export type PaginateAsignacionQueryDto = zod.infer<typeof PaginateAsignacionQuerySchema>['query'];