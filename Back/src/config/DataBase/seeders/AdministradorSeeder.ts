import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { adminSchema } from "../../../admin/admin.entity.js";
import { hashPassword } from "../../../utils/password.js";

export class AdministradorSeeder extends Seeder{
    async run(em:EntityManager){
        var empresas=await em.findAll(EmpresaSchema);
        for(const e of empresas){
            em.create(adminSchema,
                {dni:"1234567"+e.id,
                name:e.nombre+e.
                id,surName:"Kicket",
                empresa:e.id,mail:"",
                tele:"11111111111",
                pass:await hashPassword("Kicket" + e.nombre),
                type:"admin"})
            await em.flush();
        }
    }
}