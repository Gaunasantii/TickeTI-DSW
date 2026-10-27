import { TicketOutSchema } from "../../src/ticket/DTO/TicketOut.dto.js";
import { ticketcontroller } from "../../src/ticket/ticket.controller.js";
import { TicketService } from "../../src/ticket/ticket.service.js";
import {ApiSuccessResponse,ApiPaginationResponse} from "../../src/utils/api.response.js"
import {expect,describe, it,vi,beforeEach} from "vitest";

vi.mock("@mikro-orm/core",async (importOriginal)=>{
    const actual = await importOriginal<typeof import('@mikro-orm/core')>();
    return {
        ...actual,
        wrap: (entity:any)=>{
            return { toJSON: () => entity };
        }
    };
})

//No testeo el manejo de error ni la validacion de datos porque de eso no se encarga
//el controlador(Nota para meca).
describe("TicketController",()=>{
    
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(()=>{
        vi.clearAllMocks();
        res = {
            status: vi.fn().mockReturnThis() as any,
            json: vi.fn()
        };
    });

    describe("Post ticket",()=>{

        beforeEach(()=>{
            req={
                body:{title:'Ticket de prueba',description:'Descripción de prueba'},
                user:{ dni:"471070247",empresa:2},
                query:{categoria:'Hardware',estado:undefined}
            } as any;
        });

        it("Deberia crear un nuevo ticket - response status 201",async ()=>{
            const spy = vi.spyOn(TicketService,"createTicket").mockResolvedValue({} as any);
            await ticketcontroller.createTicket(req as any,res as any);
            expect(spy).toHaveBeenCalledWith({
                title:'Ticket de prueba',
                description:'Descripción de prueba',
                usuario:"471070247",
                empresa:2
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        });

        it("Deberia derivar el manejo de errores",async()=>{
            vi.spyOn(TicketService,"createTicket").mockRejectedValue(new Error("Error de prueba"));
            await expect(ticketcontroller.createTicket(req as any,res as any)).rejects.toThrow("Error de prueba");
        })
    });

    //Implemento esto pero la verdad es que el enpoint esta en desuso.
    describe("GetAllTickets",()=>{
        it("Deberia obtener todos los tickets - response status 200",async ()=>{
            vi.spyOn(TicketService,"getAllTickets").mockResolvedValue([] as any);
            await ticketcontroller.findAll(req as any,res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        });
    })

    describe("GetMyTickets",()=>{
        beforeEach(()=>{
            req={
                user:{ dni:"471070247",empresa:2},
                query:{categoria:'Hardware',estado:undefined}
            } as any;
        });

        it("Deberia obtener los tickets del usuario - response status 200",async ()=>{
            vi.spyOn(TicketService,"getMyTicketsByCatAndState").mockResolvedValue({tickets: [] as any,count:0});
            vi.spyOn(TicketOutSchema,"parse").mockReturnValue({} as any);
            await ticketcontroller.getMyTickets(req as any,res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiPaginationResponse));
        });
    })

    describe("GetPaginatedTickets",()=>{

        beforeEach(()=>{
            req={
                query:{categoria:'Hardware',estado:undefined}
            } as any;
        }); 

        it("Deberia obtener tickets paginados - response status 200",async ()=>{
            vi.spyOn(TicketService,"getPaginatedByStateAndCategory").mockResolvedValue({tickets: [] as any,count:0});
            vi.spyOn(TicketOutSchema,"parse").mockReturnValue({} as any);
            await ticketcontroller.GetAllPaginated(req as any,res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiPaginationResponse));
        });
    });

    //Endpoint en desuso: UpdateTicket
    describe("UpdateTicket",()=>{

        beforeEach(()=>{
            req={
                body:{title:'Ticket de prueba Modif',description:'Descripción de prueba modif'},
                params:{id:2}
            } as any;
        });

        it("Deberia actualizar un ticket - response status 200",async ()=>{
            vi.spyOn(TicketService,"updateTicket").mockResolvedValue({} as any);
            await ticketcontroller.updateTicket(req as any,res as any);
            expect(TicketService.updateTicket).toHaveBeenCalledWith({
                title: 'Ticket de prueba Modif',
                description: 'Descripción de prueba modif',
            }, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse))
        });
    })

    describe("ResolveTicket",()=>{

        beforeEach(()=>{
            req={
                params:{id:2},
                body:{solucion:'Solución de prueba'}
            } as any
        });

        it("Deberia resolver un ticket - response status 200",async ()=>{
            vi.spyOn(TicketService,"resolveTicket").mockResolvedValue({} as any);
            await ticketcontroller.resolveTicket(req as any,res as any);
            expect(TicketService.resolveTicket).toHaveBeenCalledWith('Solución de prueba', 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        });
    });

    describe("DeleteMyTicket",()=>{
        beforeEach(()=>{
            req={
                params:{id:2},
                user:{ dni:"471070247"}
            } as any;
        });

        it("Deberia eliminar un ticket propio - response status 200",async ()=>{
            vi.spyOn(TicketService,"DeleteMyTicket").mockResolvedValue({} as any);
            await ticketcontroller.deleteMyTicket(req as any,res as any);
            expect(TicketService.DeleteMyTicket).toHaveBeenCalledWith("471070247",2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        });
    })

    describe("Update State-Categoria-Priority",()=>{
        beforeEach(()=>{
            req={
                params:{id:2},
                body:{prioridad:2,categoria:1,estado:4}
            } as any;
        });

        it("Deberia actualizar el estado - response status 200",async()=>{
            vi.spyOn(TicketService,"ChangeState").mockResolvedValue({} as any);
            await ticketcontroller.ChangeState(req as any,res as any);
            expect(TicketService.ChangeState).toHaveBeenCalledWith(2, 4);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        })

        it("Deberia actualizar la categoria - response status 200",async()=>{
            vi.spyOn(TicketService,"ChangeCategoria").mockResolvedValue({} as any);
            await ticketcontroller.ChangeCategoria(req as any,res as any);
            expect(TicketService.ChangeCategoria).toHaveBeenCalledWith(2, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        })
        it("Deberia actualizar la prioridad - response status 200",async()=>{
            vi.spyOn(TicketService,"ChangePriority").mockResolvedValue({} as any);
            await ticketcontroller.ChangePriority(req as any,res as any);
            expect(TicketService.ChangePriority).toHaveBeenCalledWith(2, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(ApiSuccessResponse));
        })
    })

    
})