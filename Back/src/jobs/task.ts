import cron from 'node-cron';
import {asignacionDAO} from '../asignacion/asignacion.DAO.js'
import {RequestContext} from '@mikro-orm/core';
import { orm } from '../config/DataBase/db.js'; 
import dotenv from 'dotenv';

dotenv.config();

const task = cron.schedule(process.env.CRON_SCHEDULE || '* * * * * *', async ()=>{
    await RequestContext.create(orm.em, async ()=>{

    const asignaciones = await asignacionDAO.findAll({fechaCierre:null,estado:true},{populate:['ticket.prioridad'],filters: { empresa: false }})
    const asignacionesVencidas = asignaciones.filter(asignacion => {
        
        if(!asignacion.ticket.prioridad) return false;

        const fechaEstimadaCierre = new Date(asignacion.fechaCreacion);
        fechaEstimadaCierre.setDate(fechaEstimadaCierre.getDate() + asignacion.ticket.prioridad.tiempoLimiteResolucion);
        return fechaEstimadaCierre < new Date();
    });

    for (const asignacion of asignacionesVencidas) {
        await asignacionDAO.updateAsignacion({estado:false},asignacion)
    }
    });
})

export default task;