const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    dni: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    apellido: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    user: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: true
    },
    telefono: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    pass: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }    
});

module.exports = Usuario;