const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/tickets', ticketController.create);
router.get('/tickets', ticketController.getAll);

module.exports = router;