import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { TecnicoSchema } from "../../../tecnico/tecnico.entity.js";

export class TecnicoSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas=await em.findAll(EmpresaSchema);
        for(const element of empresas) {
            em.create(TecnicoSchema,{
                dni: "3512345"+element.id,
                surName : "Gómez",
                name: "Martín",
                tele: "+5491143215678",
                mail: "martin.gomez@empresa.com",
                pass: "pass", 
                type: "tecnico",
                empresa:element.id
            })

            await em.flush()
        };
    }
}