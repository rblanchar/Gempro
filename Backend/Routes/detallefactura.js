const express = require('express');
const router = express.Router();
const detallefactura = require('../services/detallefactura');
const verificarToken = require('../services/authMiddleware');


router.get('/:id', verificarToken, async function(req, res, next) {
    try {
      const { id } = req.params;
      const result = await detallefactura.getById(id);
      res.json(result);
    } catch (err) {
      console.error(`Error while getting the Invoice Detail by id`, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
  try {
    res.json(await detallefactura.create(req.body));
  } catch (err) {
    console.error(`Error while creating the Invoice Detail`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await detallefactura.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting the Invoice Detail`, err.message);
      next(err);
    }
  });

module.exports = router;