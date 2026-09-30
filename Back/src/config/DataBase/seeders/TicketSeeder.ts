import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/mysql";
import { PrioridadSchema } from "../../../prioridad/prioridad.entity.js";
import { CategoriaSchema } from "../../../categoria/categoria.entity.js";
import { EstadoSchema } from "../../../estado/estado.entity.js";
import { UserSchema } from "../../../usuario/usuario.entity.js";
import { TicketSchema } from "../../../ticket/ticket.entity.js";
import { EmpresaSchema } from "../../../empresa/empresa.entity.js";
import { TecnicoSchema } from "../../../tecnico/tecnico.entity.js";

export class TicketSeeder extends Seeder{
    async run(em:EntityManager){
        
        const empresas = await em.find(EmpresaSchema, {});

        const ticketsNuevos = [];

        for (const empresa of empresas) {
            
            const estados = await em.find(EstadoSchema, { empresa: empresa.id });
            const prioridades = await em.find(PrioridadSchema, { empresa: empresa.id });
            const categorias = await em.find(CategoriaSchema, { empresa: empresa.id });
            
            const usuarios = await em.find(UserSchema, { empresa: empresa.id });
            const tecnicos = await em.find(TecnicoSchema, { empresa: empresa.id });

            const creador = usuarios.length > 0 ? usuarios[0] : tecnicos[0];

            
            ticketsNuevos.push({
                title: `Fallo en la conexión a la VPN - [Sede ${empresa.id}]`,
                description: "El cliente no puede conectar a la red desde la actualización de Windows.",
                fechaCreacion: new Date(),
                estado: estados[0]!.id, 
                prioridad: prioridades[0]!.id, 
                categoria: categorias[0]!.id,
                usuario: creador!.dni, 
                empresa: empresa.id
            });

            if (estados.length > 1 && categorias.length > 1) {
                const creador2 = tecnicos.length > 0 ? tecnicos[0] : usuarios[0];
                ticketsNuevos.push({
                    title: `Solicitud de nuevo monitor - [Sede ${empresa.id}]`,
                    description: "Se solicita un monitor secundario para el sector de diseño.",
                    fechaCreacion: new Date(),
                    estado: estados[estados.length - 1]!.id,
                    prioridad: prioridades[prioridades.length - 1]!.id, 
                    categoria: categorias[categorias.length - 1]!.id,
                    usuario: creador2!.dni, 
                    empresa: empresa.id
                });
            }
        }

        if (ticketsNuevos.length > 0) {
            for (const data of ticketsNuevos) {
                em.create(TicketSchema, data);
            }
            await em.flush();
        } else {
            console.warn(' No se creó ningún ticket porque ninguna empresa cumplía con los requisitos completos.');
        }
    }
}