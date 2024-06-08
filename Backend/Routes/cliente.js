const express = require('express');
const router = express.Router();
const cliente = require('../services/cliente');
const verificarToken = require('../services/authMiddleware');

router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await cliente.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Client `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
    try {
      const { id } = req.params;
      const result = await cliente.getById(id);
      res.json(result);
    } catch (err) {
      console.error(`Error while getting Client by id`, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
  try {
    res.json(await cliente.create(req.body));
  } catch (err) {
    console.error(`Error while creating Client`, err.message);
    next(err);
  }
});


router.post('/login', async function(req, res, next) {
  try {
    res.json(await cliente.login(req.body));
  } catch (err) {
    console.error(`Error while creating Login`, err.message);
    next(err);
  }
});


router.put('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo } = req.body;
  
    try {
      const result = await cliente.update(id, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo);
      res.json(result);
    } catch (err) {
      console.error(`Error while updating Client`, err.message);
      next(err);
    }
  });

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await cliente.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Client`, err.message);
    next(err);
  }
});

module.exports = router;