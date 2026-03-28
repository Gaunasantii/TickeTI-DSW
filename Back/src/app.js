const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db'); // Importamos la conexión que hicimos antes

// Importar Rutas
const ticketRoutes = require('./routes/ticket.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Conectar DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar Rutas
app.use('/api', ticketRoutes);
app.use('/api', usuarioRoutes);

// Ruta de prueba (la podés dejar o sacar)
app.get('/api/status', (req, res) => {
    res.json({ status: "online", message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});