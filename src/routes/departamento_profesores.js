const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todas las relaciones departamento-profesor
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM DEPARTAMENTO_PROFESORES');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener relaciones:', err);
    res.status(500).json({ error: 'Error al obtener relaciones' });
  }
});

// Obtener una relación específica
router.get('/:departamento/:profesor', async (req, res) => {
  const { departamento, profesor } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('departamento', departamento)
      .input('profesor', profesor)
      .query('SELECT * FROM DEPARTAMENTO_PROFESORES WHERE departamento = @departamento AND profesor = @profesor');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener relación:', err);
    res.status(500).json({ error: 'Error al obtener relación' });
  }
});

// Crear una nueva relación
router.post('/', async (req, res) => {
  const { departamento, profesor } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('departamento', departamento)
      .input('profesor', profesor)
      .query('INSERT INTO DEPARTAMENTO_PROFESORES (departamento, profesor) VALUES (@departamento, @profesor)');

    res.status(201).json({ message: 'Relación creada correctamente' });
  } catch (err) {
    console.error('Error al crear relación:', err);
    res.status(500).json({ error: 'Error al crear relación' });
  }
});

// Eliminar una relación
router.delete('/:departamento/:profesor', async (req, res) => {
  const { departamento, profesor } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('departamento', departamento)
      .input('profesor', profesor)
      .query('DELETE FROM DEPARTAMENTO_PROFESORES WHERE departamento = @departamento AND profesor = @profesor');

    res.json({ message: 'Relación eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar relación:', err);
    res.status(500).json({ error: 'Error al eliminar relación' });
  }
});

module.exports = router;