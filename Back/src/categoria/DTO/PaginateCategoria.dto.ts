import zod from 'zod';

export const PaginateCategoriaSchema = zod.object({
    query: zod.object({
        page:zod.string().regex(/^\d+$/, "El número de página debe ser numérico"),
        cantPerPage:zod.string().regex(/^\d+$/, "La cantidad por página debe ser numérica")
    })
});

export type PaginateCategoriaDTO = zod.infer<typeof PaginateCategoriaSchema>["query"];