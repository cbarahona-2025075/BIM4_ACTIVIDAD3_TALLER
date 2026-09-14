import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import productosRoutes from './routes/productos.js';

const app = express();

// Evita identificadores de caché
app.set('etag', false);

// Evita mostrar información de Express
app.set('x-powered-by', false);

// Evita que el navegador almacene respuestas
app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'backend-login'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});