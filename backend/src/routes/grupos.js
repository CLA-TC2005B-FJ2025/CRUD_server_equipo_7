const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Obtener todos los grupos
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM GRUPOS');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener grupos:', err);
    res.status(500).json({ error: 'Error al obtener grupos' });
  }
});

// Obtener un grupo por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT * FROM GRUPOS WHERE idGrupo = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener grupo:', err);
    res.status(500).json({ error: 'Error al obtener grupo' });
  }
});

// Crear un nuevo grupo
router.post('/', async (req, res) => {
  const { idGrupo } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('idGrupo', idGrupo)
      .query('INSERT INTO GRUPOS (idGrupo) VALUES (@idGrupo)');

    res.status(201).json({ message: 'Grupo creado correctamente' });
  } catch (err) {
    console.error('Error al crear grupo:', err);
    res.status(500).json({ error: 'Error al crear grupo' });
  }
});

// Actualizar un grupo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idGrupo } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .input('idGrupo', idGrupo)
      .query('UPDATE GRUPOS SET idGrupo = @idGrupo WHERE idGrupo = @id');

    res.json({ message: 'Grupo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar grupo:', err);
    res.status(500).json({ error: 'Error al actualizar grupo' });
  }
});

// Eliminar un grupo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().input('id', id).query('DELETE FROM GRUPOS WHERE idGrupo = @id');

    res.json({ message: 'Grupo eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar grupo:', err);
    res.status(500).json({ error: 'Error al eliminar grupo' });
  }
});

module.exports = router;