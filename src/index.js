const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { poolPromise } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test-db', async (req, res) => {
  try {
    const pool = await poolPromise;
    if (!pool) throw new Error("Conexión a DB no inicializada");
    
    const result = await pool.request().query('SELECT TOP 5 * FROM PROFESORES');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const profesoresRoutes = require('./routes/profesores');
app.use('/api/profesores', profesoresRoutes);

const estudiantesRoutes = require('./routes/estudiantes');
app.use('/api/estudiantes', estudiantesRoutes);

const departamentosRoutes = require('./routes/departamentos');
app.use('/api/departamentos', departamentosRoutes);

const encuestasRoutes = require('./routes/encuestas');
app.use('/api/encuestas', encuestasRoutes);

const preguntasRoutes = require('./routes/preguntas');
app.use('/api/preguntas', preguntasRoutes);

const respuestasRoutes = require('./routes/respuestas');
app.use('/api/respuestas', respuestasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});