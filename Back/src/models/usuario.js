const { DataTypes, Op } = require('sequelize');
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
        type: DataTypes.STRING,
        allowNull: false 
    },
    pass: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }}, {
    
    hooks: {
        beforeCreate: async (usuario) => {
            // 1. Generar base: inicial nombre + 5 letras apellido
            const primeraLetra = usuario.nombre[0].toLowerCase();
            const apellidoFragmento = usuario.apellido.substring(0, 5).toLowerCase();
            const baseUser = `${primeraLetra}${apellidoFragmento}`;

            // 2. Contar cuántos usuarios existen que empiecen con esa base
            const count = await Usuario.count({
                where: {
                    user: {
                        [Op.like]: `${baseUser}%`
                    }
                }
            });

            // 3. Asignar el user con el número secuencial (siempre empieza en 0)
            usuario.user = `${baseUser}${count}`;

            // 4. Generar el email basado en ese usuario
            usuario.email = `${usuario.user}@ticketi.com`;
        }
    }
});

module.exports = Usuario;