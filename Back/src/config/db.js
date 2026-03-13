const { Sequelize } = require('sequelize');
require('dotenv').config();

// Creamos la instancia de conexión
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nombre de la base de datos
    process.env.DB_USER,     // Tu usuario (ej: 'root')
    process.env.DB_PASSWORD, // Tu contraseña
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Para que no llene la consola de SQL
    }
);

// Función para probar la conexión y sincronizar
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL exitosa.');
        
        // Sincroniza los modelos con la DB (crea las tablas)
        await sequelize.sync({ alter: true });
        console.log('✅ Tablas sincronizadas correctamente.');
    } catch (error) {
        console.error('❌ Error de conexión a la base de datos:', error.message);
        process.exit(1); // Detiene la app si no hay base de datos
    }
};

module.exports = { sequelize, connectDB };