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

// Obtener una pregunta por idEncuesta y numPregunta
router.get('/:idEncuesta/:numPregunta', async (req, res) => {
  const { idEncuesta, numPregunta } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .query('SELECT * FROM PREGUNTAS WHERE idEncuesta = @idEncuesta AND numPregunta = @numPregunta');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener pregunta:', err);
    res.status(500).json({ error: 'Error al obtener pregunta' });
  }
});

// Crear nueva pregunta
router.post('/', async (req, res) => {
  const { idEncuesta, pregunta, numPregunta } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('idEncuesta', idEncuesta)
      .input('pregunta', pregunta)
      .input('numPregunta', numPregunta)
      .query(`
        INSERT INTO PREGUNTAS (idEncuesta, pregunta, numPregunta)
        VALUES (@idEncuesta, @pregunta, @numPregunta)
      `);

    res.status(201).json({ message: 'Pregunta creada correctamente' });
  } catch (err) {
    console.error('Error al crear pregunta:', err);
    res.status(500).json({ error: 'Error al crear pregunta' });
  }
});

// Actualizar una pregunta
router.put('/:idEncuesta/:numPregunta', async (req, res) => {
  const { idEncuesta, numPregunta } = req.params;
  const { pregunta } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .input('pregunta', pregunta)
      .query(`
        UPDATE PREGUNTAS
        SET pregunta = @pregunta
        WHERE idEncuesta = @idEncuesta AND numPregunta = @numPregunta
      `);

    res.json({ message: 'Pregunta actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar pregunta:', err);
    res.status(500).json({ error: 'Error al actualizar pregunta' });
  }
});

// Eliminar una pregunta
router.delete('/:idEncuesta/:numPregunta', async (req, res) => {
  const { idEncuesta, numPregunta } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .query('DELETE FROM PREGUNTAS WHERE idEncuesta = @idEncuesta AND numPregunta = @numPregunta');

    res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar pregunta:', err);
    res.status(500).json({ error: 'Error al eliminar pregunta' });
  }
});

module.exports = router;