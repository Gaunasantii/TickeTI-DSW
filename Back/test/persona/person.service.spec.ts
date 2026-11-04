import { PersonService } from "../../src/persona/person.service.js";
import { PersonDAO } from "../../src/persona/person.DAO.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("PersonService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("PaginateUserAndTecnicos", () => {
    it("Debería retornar las personas paginadas filtrando por roles user y tecnico", async () => {
      const mockRespuestaDAO = {
        persons: [
          { dni: "471070247", nombre: "Santiago", type: "user" },
          { dni: "301234567", nombre: "Nicolás", type: "tecnico" }
        ],
        total: 2
      };

      const spy = vi.spyOn(PersonDAO, "PaginatePersons").mockResolvedValue(mockRespuestaDAO as any);

      const resultado = await PersonService.PaginateUserAndTecnicos(1, 10);

      expect(spy).toHaveBeenCalledWith(
        1,
        10,
        { type: { $in: ["user", "tecnico"] } },
        { populate: ["oficina"] }
      );
      expect(resultado).toEqual(mockRespuestaDAO);
    });
  });
});