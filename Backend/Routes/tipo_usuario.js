const express = require('express');
const router = express.Router();
const tipo_usuario = require('../services/tipo_usuario');
const verificarToken = require('../services/authMiddleware');

router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await tipo_usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Type of User `, err.message);
    next(err);
  }
});

/* POST (enviar, setear) */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tipo_usuario.create(req.body));
  } catch (err) {
    console.error(`Error while creating Type of User`, err.message);
    next(err);
  }
});

/* PUT (actualizar) */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await tipo_usuario.update(req.params.id, req.body.nombre));
  } catch (err) {
    console.error(`Error while updating Type of User`, err.message);
    next(err);
  }
});

/* DELETE (eliminar) */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await tipo_usuario.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Type of User`, err.message);
    next(err);
  }
});

module.exports = router;