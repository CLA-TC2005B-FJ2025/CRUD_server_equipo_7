const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM PREGUNTAS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener preguntas:', err);
    res.status(500).json({ error: 'Error al obtener preguntas' });
  }
});

module.exports = router;