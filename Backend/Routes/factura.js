const express = require('express');
const router = express.Router();
const factura = require('../services/factura');
//const { createFactura } = require('../services/factura');
const verificarToken = require('../services/authMiddleware');


router.get('/', verificarToken, async function(req, res, next) {
  try {
    res.json(await factura.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting the Invoice `, err.message);
    next(err);
  }
});

router.get('/proximoId', verificarToken, async function(req, res, next) {
    try {
      const proximoId = await factura.proximoIdFactura();
      res.json({ proximoId });
    } catch (err) {
      console.error(`Error while getting next invoice ID`, err.message);
      next(err);
    }
  });

router.get('/:id', verificarToken, async function(req, res, next) {
    try {
      const { id } = req.params;
      const result = await factura.getById(id);
      res.json(result);
    } catch (err) {
      console.error(`Error while getting Invoice by id`, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
  try {
    res.json(await factura.create(req.body));
  } catch (err) {
    console.error(`Error while creating the Invoice`, err.message);
    next(err);
  }
});



module.exports = router;