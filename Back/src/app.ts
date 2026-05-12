import Express from 'express';
import cors from 'cors';
import { initOrm,orm,checkDb,syncSchema } from './config/db.js';
import { userrouter } from './routes/usuario.routes.js';
import { estadoRouter } from './routes/estado.routes.js';
import { adminrouter } from './routes/admin.routes.js';
import { categoriarouter } from './routes/categoria.routes.js';
import { empresarouter } from './routes/empresa.routes.js';
import { oficinarouter } from './routes/oficina.routes.js';
import { prioridadrouter } from './routes/prioridad.routes.js';
import { tecnicorouter } from './routes/tecnico.routes.js';
import { ticketrouter } from './routes/ticket.routes.js';


// Importar Rutas

const app = Express();

// Conectar DB
await initOrm();
syncSchema();
await checkDb();

// Middlewares
app.use(cors());
app.use(Express.json());

// Usar Rutas
//app.use('/api', ticketRoutes);
app.use('/api', userrouter);
app.use('/api',estadoRouter);
app.use('/api',adminrouter);
app.use('/api',categoriarouter);
app.use('/api',empresarouter);
app.use('/api',oficinarouter);
app.use('/api',prioridadrouter);
app.use('/api',tecnicorouter);
app.use('/api',ticketrouter);


// Ruta de prueba (la podés dejar o sacar)
app.get('/api/status', (req, res) => {
    res.json({ status: "online", message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
