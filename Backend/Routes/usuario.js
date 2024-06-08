const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');
const verificarToken = require('../services/authMiddleware');

router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting usuario `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const result = await usuario.getById(id);
    res.json(result);
  } catch (err) {
    console.error(`Error while getting User by id`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await usuario.create(req.body));
  } catch (err) {
    console.error(`Error while creating usuario`, err.message);
    next(err);
  }
});


router.post('/login', async function(req, res, next) {
  try {
    res.json(await usuario.login(req.body));
  } catch (err) {
    console.error(`Error while creating Login`, err.message);
    next(err);
  }
});


router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo } = req.body;

  try {
    const result = await usuario.update(id, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await usuario.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting usuario`, err.message);
    next(err);
  }
});

module.exports = router;