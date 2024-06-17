const express = require('express');
const router = express.Router();
const producto = require('../services/producto');
//const verificarToken = require('../services/authMiddleware');

router.get('/', /*verificarToken,*/ async function(req, res, next) {
  try {
    res.json(await producto.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Product `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await producto.create(req.body));
  } catch (err) {
    console.error(`Error while creating Product`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material } = req.body;

  try {
    const result = await producto.update(id, descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material);
    res.json(result);
  } catch (err) {
    console.error(`Error while updating Product`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await producto.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Product`, err.message);
    next(err);
  }
});

module.exports = router;