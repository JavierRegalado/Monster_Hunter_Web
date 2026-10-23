const express = require('express');
const cors = require('cors');
const monstruoRoutes = require('./routes/monstruoRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/monstruos', monstruoRoutes);

// Endpoint de estado
app.get('/api/health', (req, res) => {
    res.json({ estado: 'OK', mensaje: 'Servidor del Gremio operativo' });
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});