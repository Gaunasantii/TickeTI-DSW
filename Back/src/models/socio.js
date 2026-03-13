const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Socio = sequelize.define('Socio', {
    // El ID se crea automáticamente como un entero autoincremental
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        unique: true, // No puede haber dos socios con el mismo DNI
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
}, {
    timestamps: true // Esto crea campos "createdAt" y "updatedAt" automáticamente
});

module.exports = Socio;