const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    dni: { 
        type: DataTypes.INTEGER,
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
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    telefono: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }    
});

module.exports = Usuario;