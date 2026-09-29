import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { PersonSchema } from "../../../persona/person.entity.js";
import dotenv from 'dotenv';

dotenv.config();

export class SuperAdminSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        
        const superAdminExistente = await em.findOne(PersonSchema, { 
            dni: '00000000' 
        });

        
        if (!superAdminExistente) {

            await em.createQueryBuilder(PersonSchema).
            insert({
                dni: '00000000',
                name: 'Super',
                surName: 'Administrador',
                tele:'0000000000',
                pass:process.env.S_ADMIN_PASS as string,
                mail:process.env.S_ADMIN_MAIL as string,
                type:"S_ADMIN"}).execute();
        } else {
            console.log('El Super Admin ya existía en la base de datos. Saltando creación.');
        }
    }
}