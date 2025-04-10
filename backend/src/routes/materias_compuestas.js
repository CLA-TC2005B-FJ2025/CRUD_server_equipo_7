const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todas las materias compuestas

// Incompleto, falta actualizacion de Samuel 
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM MATERIAS_COMPUESTAS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener materias compuestas:', err);
    res.status(500).json({ error: 'Error al obtener materias compuestas' });
  }
});

module.exports = router;