const express = require('express');
const router = express.Router();
const categoria = require('../services/categoria');
const verificarToken = require('../services/authMiddleware');

/* GET (leer, obtener) categorias. */
router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await categoria.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting categorias `, err.message);
    next(err);
  }
});


/* POST (enviar, setear) categorias */
router.post('/', async function(req, res, next) {
  try {
    res.json(await categoria.create(req.body));
  } catch (err) {
    console.error(`Error while creating categoria`, err.message);
    next(err);
  }
});

/* PUT (actualizar) categorias */
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const result = await categoria.update(id, nombre);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating category`, err.message);
    next(err);
  }
});


/* DELETE (eliminar) categorias */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await categoria.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting categoria`, err.message);
    next(err);
  }
});
module.exports = router;