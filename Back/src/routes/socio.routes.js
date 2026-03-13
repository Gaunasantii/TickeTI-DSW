const express = require('express');
const router = express.Router();
const socioController = require('../controllers/socio.controller');

router.post('/socios', socioController.create);
router.get('/socios', socioController.getAll);

module.exports = router;