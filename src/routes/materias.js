const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todas las materias
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM MATERIAS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener materias:', err);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
});

// Obtener una materia por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT * FROM MATERIAS WHERE idMateria = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener materia:', err);
    res.status(500).json({ error: 'Error al obtener materia' });
  }
});

// Crear una nueva materia
router.post('/', async (req, res) => {
  const { nombreMateria } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('nombreMateria', nombreMateria)
      .query('INSERT INTO MATERIAS (nombreMateria) VALUES (@nombreMateria)');

    res.status(201).json({ message: 'Materia creada correctamente' });
  } catch (err) {
    console.error('Error al crear materia:', err);
    res.status(500).json({ error: 'Error al crear materia' });
  }
});

// Actualizar una materia
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombreMateria } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .input('nombreMateria', nombreMateria)
      .query('UPDATE MATERIAS SET nombreMateria = @nombreMateria WHERE idMateria = @id');

    res.json({ message: 'Materia actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar materia:', err);
    res.status(500).json({ error: 'Error al actualizar materia' });
  }
});

// Eliminar una materia
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().input('id', id).query('DELETE FROM MATERIAS WHERE idMateria = @id');

    res.json({ message: 'Materia eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar materia:', err);
    res.status(500).json({ error: 'Error al eliminar materia' });
  }
});

module.exports = router;