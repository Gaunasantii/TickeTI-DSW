import { orm } from "../config/db.js";
import { defineEntity , p, type EventArgs, type InferEntity } from "@mikro-orm/core";
import { UserSchema } from "./usuario.entity.js";


export const TicketSchema = defineEntity({
    name:'ticket',
    properties:{
        id:p.integer().primary().autoincrement(),
        title:p.string(),
        description:p.string(),
        //prioridad:p.manyToOne('PrioridadSchema').inversedBy('ticket'),
        //categoria:p.manyToOne('categoriaSchema').inversedBy('ticket),
        usuario:()=>p.manyToOne('user' as any).inversedBy('tickets'),
    }
})


/*
const Ticket = sequelize.define('Ticket', {
    titulo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    prioridad: { 
        type: DataTypes.ENUM('Baja', 'Media', 'Alta', 'Urgente'), // Agregué Urgente para que coincida con el Front
        defaultValue: 'Baja' 
    },
    categoria: { 
        type: DataTypes.ENUM('', 'Hardware', 'Software', 'Redes', 'Accesos'), 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.ENUM('Abierto', 'En Proceso', 'Cerrado'), 
        defaultValue: 'Abierto' 
    },
    dni: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    }
});

module.exports = Ticket;

*/