const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todos los profesores
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM PROFESORES');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener profesores:', err);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Obtener un profesor por matrícula
router.get('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('matricula', matricula)
      .query('SELECT * FROM PROFESORES WHERE matricula = @matricula');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener profesor:', err);
    res.status(500).json({ error: 'Error al obtener profesor' });
  }
});

// Crear un nuevo profesor
router.post('/', async (req, res) => {
  const { matricula, nombre1, nombre2, apellido1, apellido2, correoInst, departamento } = req.body;
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
      .input('departamento', departamento)
      .query(`
        INSERT INTO PROFESORES (matricula, nombre1, nombre2, apellido1, apellido2, correoInst, departamento)
        VALUES (@matricula, @nombre1, @nombre2, @apellido1, @apellido2, @correoInst, @departamento)
      `);

    res.status(201).json({ message: 'Profesor creado correctamente' });
  } catch (err) {
    console.error('Error al crear profesor:', err);
    res.status(500).json({ error: 'Error al crear profesor' });
  }
});

// Actualizar un profesor
router.put('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  const { nombre1, nombre2, apellido1, apellido2, correoInst, departamento } = req.body;
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
      .input('departamento', departamento)
      .query(`
        UPDATE PROFESORES
        SET nombre1 = @nombre1, nombre2 = @nombre2, apellido1 = @apellido1,
            apellido2 = @apellido2, correoInst = @correoInst, departamento = @departamento
        WHERE matricula = @matricula
      `);

    res.json({ message: 'Profesor actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar profesor:', err);
    res.status(500).json({ error: 'Error al actualizar profesor' });
  }
});

// Eliminar un profesor
router.delete('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('matricula', matricula)
      .query('DELETE FROM PROFESORES WHERE matricula = @matricula');

    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar profesor:', err);
    res.status(500).json({ error: 'Error al eliminar profesor' });
  }
});

module.exports = router;