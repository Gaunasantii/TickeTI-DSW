import Express from 'express';
import cors from 'cors';
import { initOrm, orm, checkDb, syncSchema } from './config/db.js';
import { userrouter } from './usuario/usuario.routes.js';
import { estadoRouter } from './estado/estado.routes.js';
import { adminrouter } from './admin/admin.routes.js';
import { categoriarouter } from './categoria/categoria.routes.js';
import { empresarouter } from './empresa/empresa.routes.js';
import { oficinarouter } from './oficinas/oficina.routes.js';
import { prioridadrouter } from './prioridad/prioridad.routes.js';
import { tecnicorouter } from './tecnico/tecnico.routes.js';
import { ticketrouter } from './ticket/ticket.routes.js';
import { asignacionrouter } from './asignacion/asignacion.routes.js';
import { authRouter } from './auth/auth.routes.js';


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
app.use('/api', estadoRouter);
app.use('/api', adminrouter);
app.use('/api', categoriarouter);
app.use('/api', empresarouter);
app.use('/api', oficinarouter);
app.use('/api', prioridadrouter);
app.use('/api', tecnicorouter);
app.use('/api', ticketrouter);
app.use('/api', asignacionrouter)
app.use('/api/auth', authRouter);


// Ruta de prueba (la podés dejar o sacar)
app.get('/api/status', (req, res) => {
    res.json({ status: "online", message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
