const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todos los departamentos
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM DEPARTAMENTO');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener departamentos:', err);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
});

// Obtener un departamento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT * FROM DEPARTAMENTO WHERE idDepartamento = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener departamento:', err);
    res.status(500).json({ error: 'Error al obtener departamento' });
  }
});

// Crear un nuevo departamento
router.post('/', async (req, res) => {
  const { nombreDepartamento, coordinador } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('nombreDepartamento', nombreDepartamento)
      .input('coordinador', coordinador)
      .query(`
        INSERT INTO DEPARTAMENTO (nombreDepartamento, coordinador)
        VALUES (@nombreDepartamento, @coordinador)
      `);

    res.status(201).json({ message: 'Departamento creado correctamente' });
  } catch (err) {
    console.error('Error al crear departamento:', err);
    res.status(500).json({ error: 'Error al crear departamento' });
  }
});

// Actualizar un departamento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombreDepartamento, coordinador } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .input('nombreDepartamento', nombreDepartamento)
      .input('coordinador', coordinador)
      .query(`
        UPDATE DEPARTAMENTO
        SET nombreDepartamento = @nombreDepartamento, coordinador = @coordinador
        WHERE idDepartamento = @id
      `);

    res.json({ message: 'Departamento actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar departamento:', err);
    res.status(500).json({ error: 'Error al actualizar departamento' });
  }
});

// Eliminar un departamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .query('DELETE FROM DEPARTAMENTO WHERE idDepartamento = @id');

    res.json({ message: 'Departamento eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar departamento:', err);
    res.status(500).json({ error: 'Error al eliminar departamento' });
  }
});

module.exports = router;