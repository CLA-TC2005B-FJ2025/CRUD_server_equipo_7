const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todas las respuestas
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RESPUESTAS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener respuestas:', err);
    res.status(500).json({ error: 'Error al obtener respuestas' });
  }
});

// Obtener respuestas por idEncuesta
router.get('/:idEncuesta', async (req, res) => {
  const { idEncuesta } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('idEncuesta', idEncuesta)
      .query('SELECT * FROM RESPUESTAS WHERE idEncuesta = @idEncuesta');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'No se encontraron respuestas para esa encuesta' });
    }

    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener respuestas:', err);
    res.status(500).json({ error: 'Error al obtener respuestas' });
  }
});

// Crear una nueva respuesta
router.post('/', async (req, res) => {
  const { idEncuesta, numPregunta, calificacion, comentarios, estudiante } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .input('calificacion', calificacion)
      .input('comentarios', comentarios)
      .input('estudiante', estudiante)
      .query(`
        INSERT INTO RESPUESTAS (idEncuesta, numPregunta, calificacion, comentarios, estudiante)
        VALUES (@idEncuesta, @numPregunta, @calificacion, @comentarios, @estudiante)
      `);

    res.status(201).json({ message: 'Respuesta registrada correctamente' });
  } catch (err) {
    console.error('Error al registrar respuesta:', err);
    res.status(500).json({ error: 'Error al registrar respuesta' });
  }
});

// Actualizar una respuesta
router.put('/:idEncuesta/:numPregunta/:estudiante', async (req, res) => {
  const { idEncuesta, numPregunta, estudiante } = req.params;
  const { calificacion, comentarios } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .input('estudiante', estudiante)
      .input('calificacion', calificacion)
      .input('comentarios', comentarios)
      .query(`
        UPDATE RESPUESTAS
        SET calificacion = @calificacion, comentarios = @comentarios
        WHERE idEncuesta = @idEncuesta AND numPregunta = @numPregunta AND estudiante = @estudiante
      `);

    res.json({ message: 'Respuesta actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar respuesta:', err);
    res.status(500).json({ error: 'Error al actualizar respuesta' });
  }
});

// Eliminar una respuesta
router.delete('/:idEncuesta/:numPregunta/:estudiante', async (req, res) => {
  const { idEncuesta, numPregunta, estudiante } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('idEncuesta', idEncuesta)
      .input('numPregunta', numPregunta)
      .input('estudiante', estudiante)
      .query(`
        DELETE FROM RESPUESTAS
        WHERE idEncuesta = @idEncuesta AND numPregunta = @numPregunta AND estudiante = @estudiante
      `);

    res.json({ message: 'Respuesta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar respuesta:', err);
    res.status(500).json({ error: 'Error al eliminar respuesta' });
  }
});

module.exports = router;