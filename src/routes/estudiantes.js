const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM ESTUDIANTES');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener estudiantes:', err);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Obtener un estudiante por matrícula
router.get('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('matricula', matricula)
      .query('SELECT * FROM ESTUDIANTES WHERE matricula = @matricula');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener estudiante:', err);
    res.status(500).json({ error: 'Error al obtener estudiante' });
  }
});

// Crear un nuevo estudiante
router.post('/', async (req, res) => {
  const { matricula, nombre1, nombre2, apellido1, apellido2, correoInst } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('matricula', matricula)
      .input('nombre1', nombre1)
      .input('nombre2', nombre2)
      .input('apellido1', apellido1)
      .input('apellido2', apellido2)
      .input('correoInst', correoInst)
      .query(`
        INSERT INTO ESTUDIANTES (matricula, nombre1, nombre2, apellido1, apellido2, correoInst)
        VALUES (@matricula, @nombre1, @nombre2, @apellido1, @apellido2, @correoInst)
      `);

    res.status(201).json({ message: 'Estudiante creado correctamente' });
  } catch (err) {
    console.error('Error al crear estudiante:', err);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
});

// Actualizar un estudiante
router.put('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  const { nombre1, nombre2, apellido1, apellido2, correoInst } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('matricula', matricula)
      .input('nombre1', nombre1)
      .input('nombre2', nombre2)
      .input('apellido1', apellido1)
      .input('apellido2', apellido2)
      .input('correoInst', correoInst)
      .query(`
        UPDATE ESTUDIANTES
        SET nombre1 = @nombre1, nombre2 = @nombre2, apellido1 = @apellido1,
            apellido2 = @apellido2, correoInst = @correoInst
        WHERE matricula = @matricula
      `);

    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar estudiante:', err);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

// Eliminar un estudiante
router.delete('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('matricula', matricula)
      .query('DELETE FROM ESTUDIANTES WHERE matricula = @matricula');

    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar estudiante:', err);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
});

module.exports = router;