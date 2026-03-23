const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
        type: DataTypes.ENUM('Hardware', 'Software', 'Redes', 'Accesos'), 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.ENUM('Abierto', 'En Proceso', 'Cerrado'), 
        defaultValue: 'Abierto' 
    },
    dni: { 
        type: DataTypes.STRING(20), // Usamos STRING por si algún DNI tiene puntos o para otros países
        allowNull: false 
    }
});

module.exports = Ticket;