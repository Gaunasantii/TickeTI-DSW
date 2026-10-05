import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { UserSchema } from "../../../usuario/usuario.entity.js";
import { OficinaSchema } from "../../../oficinas/oficina.entity.js";

export class UsuarioSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas= await em.findAll(EmpresaSchema);
        for (const e of empresas) {
            const oficinas = await em.find(OficinaSchema,{empresa:e.id});
            for(const o of oficinas) {
                em.create(UserSchema,{
                    dni: "401112"+e.id+o.id,
                    surName: "Rodríguez",
                    name: "Carlos",
                    tele: "+5493512223344",
                    mail: "",
                    pass: "pass",
                    type: "user",
                    empresa:e.id,
                    oficina:o.id
                })

                await em.flush();
            };
        }
    }
}