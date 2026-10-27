import { EstadoService } from "../../../src/estado/estado.service.js";
import { EstadoDAO } from "../../../src/estado/estado.DAO";
import { NotFoundError } from "../../../src/utils/base.error";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Estado } from "../../../src/estado/estado.entity";

describe ("EstadoService", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    //Create
    describe ("createEstado", () => {
        it ("Deberia crear un estado correctamente", async () => {
            const estadoInput = {
                nombre: "En revision",
                descripcion: "El ticket esta siendo revisado",
            };

            const estadoCreado = {
                id:1,
                ...estadoInput,
            };

            const spy = vi.spyOn(EstadoDAO, "createState").mockResolvedValue(estadoCreado as any);

            const resultado = await EstadoService.createEstado(estadoInput);

            expect(spy).toHaveBeenCalledWith(estadoInput);
            expect(resultado).toEqual(estadoCreado);
        });
    });

    //Get id
    describe ("getEstadoById", () => {
        it("Deberia recuperar un estado por su id ", async () => {
            const estado = {
                id: 1,
                nombre: "Abierto",
                descripcion: "Ticket recién creado",
                esEstadoInicial: true,
                esEstadoFinal: false,
                esEstadoBase: true,
            };

            const spy = vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(estado as any);

            const resultado = await EstadoService.getEstadoById(1);

            expect(spy).toHaveBeenCalledWith({id: 1});
            expect(resultado).toEqual(estado);
        });

        it ("Deberia lanzar NotFoundError si el estado no existe", async () => {
            vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(null as any);

            await expect (
                EstadoService.getEstadoById(99)
            ).rejects.toThrow(NotFoundError);
        });
    });

    //Get all
    describe ("getAll", () =>{
        it("Deberia devolver todos los estados", async () =>{
            const estados = [
                {id: 1, nombre: "Abierto"},
                {id: 2, nombre: "Cerrado"},
            ];

            const spy = vi.spyOn(EstadoDAO, "findAll").mockResolvedValue(estados as any);

            const resultado = await EstadoService.getAll();

            expect(spy).toHaveBeenCalledWith({});
            expect(resultado).toEqual(estados);
        });
    });

    //Get paginated
    describe ("getEstadosPaginated", () => {
        it("Deberia devolver los estados paginados", async () => {
            const respuesta = {
                estado: ({ id:1, nombre:"Abierto"}),
                total: 1,
            }

            const spy = vi.spyOn(EstadoDAO, "getEstadosPaginated").mockResolvedValue(respuesta as any);
        
            const resultado =await EstadoService.getEstadosPaginated(1,10);

            expect(spy).toHaveBeenCalledWith({},1,10);
            expect(resultado).toEqual(respuesta);
        });
    });

    //Update
    describe ("updateEstados", () =>{
        it("Deberia actualizar un estado existente", async () => {
            const estadosExistentes = {
                id:1,
                nombre:"Abierto",
                descripcion:"Descripcion anterior",
                estadoBase: false,
            }

            const datosActualizados = {
                nombre: "En proceso",
                descripcion: "El ticket esta siendo atendido",
            };

            const estadoActualActualizado = {
                ...estadosExistentes,
                ...datosActualizados,
            };

            const spyFind = vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(estadosExistentes as any);

            const spyUpdate = vi.spyOn(EstadoDAO, "updateState").mockResolvedValue(estadoActualActualizado as any);

            const resultado = await EstadoService.updateEstado(1, datosActualizados);

            expect(spyFind).toHaveBeenCalledWith({id:1});

            expect(spyUpdate).toHaveBeenCalledWith(datosActualizados, estadosExistentes);

            expect(resultado).toEqual(estadoActualActualizado)
        });

        it("Deberia mostrar NotFoundError si el estado no existe", async () => {
            const spyUpdate = vi.spyOn(EstadoDAO, "updateState");

            vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(null as any);

            await expect(EstadoService.updateEstado(99, {nombre: "Modificado"})).rejects.toThrow(NotFoundError);

            expect(spyUpdate).not.toHaveBeenCalled();
        });
    });

    //Delete
    describe("deleteEstado", () => {
        it("Deberia eliminar un estado que no sea base", async () => {
            const estado = {
                id:1,
                nombre:"En revision",
                descripcion:"Estado personalizado",
                esEstadoBase: false,
            };

            const spyFind = vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(estado as any);

            const spyDelete = vi.spyOn(EstadoDAO, "delete").mockResolvedValue(undefined);

            const resultado = await EstadoService.deleteEstado(2);
                
            expect(spyFind).toHaveBeenCalledWith({id:2});

            expect(spyDelete).toHaveBeenCalledWith(estado);

            expect(resultado).toBeUndefined();
        });

        it("Deberia devolver NotFoundError si el estado no existe",  async () => {
            const spyDelete = vi.spyOn(EstadoDAO, "delete");

            vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(null as any);

            await expect (EstadoService.deleteEstado(99)).rejects.toThrow(NotFoundError);

            expect(spyDelete).not.toHaveBeenCalled();
        });

        it("No deberia permitir eliminar un estado base", async () => {
            const estadoBase = {
                id:1,
                nombre:"Abierto",
                descripcion:"Ticket recien creado",
                esEstadoBase: true,
            };

            const spyDelete = vi.spyOn(EstadoDAO, "delete");

            vi.spyOn(EstadoDAO, "findOne").mockResolvedValue(estadoBase as any);

            await expect (EstadoService.deleteEstado(1)).rejects.toThrow("No se puede eliminar un estado base");

            expect(spyDelete).not.toHaveBeenCalled();
        });
    });
});