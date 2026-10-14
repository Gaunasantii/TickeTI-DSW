import zod from 'zod'

export const PaginateAsignacionQuerySchema = zod.object({
    query:zod.object({
        page: zod.string().regex(/^\d+$/),
        cantPerPage: zod.string().regex(/^\d+$/),
    })
});

export type PaginateAsignacionQueryDto = zod.infer<typeof PaginateAsignacionQuerySchema>['query'];