import { describe, it, expect, vi, beforeEach } from "vitest";
import {Categoriacontroller} from "../../src/categoria/categoria.controller";
import { categoriaDAO } from "../../src/categoria/categoria.DAO";
import { NotFoundError } from "../../src/utils/base.error.js";
import { ApiSuccessResponse, ApiPaginationResponse } from "../../src/utils/api.response.js";

vi.mock("@mikro-orm/core",async (importOriginal)=>{
    const actual = await importOriginal<typeof import('@mikro-orm/core')>();
    return {
        ...actual,
        wrap: (entity:any)=>{
            return { toJSON: () => entity };
        }
    };
})

describe("CategoriaController", () => {

    let req: Partial<Request>;
    let res: Partial<Response>;
    
    beforeEach(()=>{
        vi.clearAllMocks();
        res = {
            status: vi.fn().mockReturnThis() as any,
            json: vi.fn()
        };
    });

    describe("GetCategorias", () => {


        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2}
            } as any;
        });

        it("Deberia recuperar todas las categorias", async () => {
            vi.spyOn(categoriaDAO, "findAll").mockResolvedValue([
                { id: 1, nombre: "Categoria 1" },
                { id: 2, nombre: "Categoria 2" }
            ] as any);
            await Categoriacontroller.findAll(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse))
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: [
                    { id: 1, nombre: "Categoria 1" },
                    { id: 2, nombre: "Categoria 2" }
                ],
                message: "Categorias recuperadas exitosamente"
            }));
        });
    });

    describe("createCategoria", () => {
        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2},
                body: { nombre: "Nueva Categoria" }
            } as any;
        });

        it("Deberia crear una nueva categoria", async () => {
            vi.spyOn(categoriaDAO, "createCategoria").mockResolvedValue({ id: 1, nombre: "Nueva Categoria" } as any);
            await Categoriacontroller.createCategoria(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: null,
                message: "Categoria creada exitosamente",
                success: true
            }));
        });
    });

    describe("updateCategoria",()=>{
        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2},
                params: { id: 1 },
                body: { nombre: "Categoria Actualizada" }
            } as any;
        });

        it("Deberia actualizar una categoria existente", async () => {
            vi.spyOn(categoriaDAO, "updateCategoria").mockResolvedValue({ id: 1, nombre: "Categoria Actualizada" } as any);
            vi.spyOn(categoriaDAO,"findOne").mockResolvedValue({ id: 1, nombre: "Categoria" } as any);
            await Categoriacontroller.updateCategoria(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: { id: 1, nombre: "Categoria Actualizada" },
                message: "Categoria modificada con exito",
                success: true
            }));
        });

        it("Deberia lanzar un error si la categoria no existe", async () => {
            vi.spyOn(categoriaDAO,"findOne").mockResolvedValue(null as any);
            await expect(Categoriacontroller.updateCategoria(req as any, res as any)).rejects.toThrow(NotFoundError);
        });
    })

    describe("deleteCategoria",()=>{
        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2},
                params: { id: 1 },
                body: { nombre: "Categoria Actualizada" }
            } as any;
        });

        it("Deberia eliminar una categoria existente", async () => {
            vi.spyOn(categoriaDAO, "deleteCategoria").mockResolvedValue(true as any);
            vi.spyOn(categoriaDAO,"findOne").mockResolvedValue({ id: 1, nombre: "Categoria" } as any);
            await Categoriacontroller.deleteCategoria(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: null,
                message: "Categoria eliminada con exito",
                success: true
            }));
        });
        it("Deberia lanzar un error si la categoria no existe", async () => {
            vi.spyOn(categoriaDAO,"findOne").mockResolvedValue(null as any);
            await expect(Categoriacontroller.deleteCategoria(req as any, res as any)).rejects.toThrow(NotFoundError);
        });
    })

    describe("getCategoriaPaginated",()=>{
        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2},
                query: { page: 1, cantPerPage: 10 }
            } as any;
        });

        it("Deberia obtener categorias paginadas", async () => {
            vi.spyOn(categoriaDAO, "getCategoriasPaginated").mockResolvedValue({
                categorias: [{ id: 1, nombre: "Categoria" }],
                total: 1
            } as any);
            await Categoriacontroller.getCategoriasPaginated(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiPaginationResponse));
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: [{ id: 1, nombre: "Categoria" }],
                message: "Paginado de categorias recuperado",
                success: true,
                meta: {
                    currentPage: 1,
                    itemsPerPage: 10,
                    totalItems: 1,
                    totalPages: 1,
                }
            }));
        });
    })
});