const express = require('express');
const router = express.Router();
const material = require('../services/material');
const verificarToken = require('../services/authMiddleware');

router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await material.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting materiales `, err.message);
    next(err);
  }
});

/* POST (enviar, setear) */
router.post('/', async function(req, res, next) {
  try {
    res.json(await material.create(req.body));
  } catch (err) {
    console.error(`Error while creating material`, err.message);
    next(err);
  }
});

/* PUT (actualizar) */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await material.update(req.params.id, req.body.nombre));
  } catch (err) {
    console.error(`Error while updating material`, err.message);
    next(err);
  }
});

/* DELETE (eliminar) */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await material.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting material`, err.message);
    next(err);
  }
});

module.exports = router;