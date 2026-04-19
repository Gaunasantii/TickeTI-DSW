import Express from 'express';
import cors from 'cors';
import { initOrm,orm,checkDb,syncSchema } from './config/db.js'; // Importamos la conexión que hicimos antes

// Importar Rutas

const app = Express();

// Conectar DB
await initOrm();
syncSchema();

// Middlewares
app.use(cors());
app.use(Express.json());

// Usar Rutas
//app.use('/api', ticketRoutes);
//app.use('/api', usuarioRoutes);

// Ruta de prueba (la podés dejar o sacar)
app.get('/api/status', (req, res) => {
    res.json({ status: "online", message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});