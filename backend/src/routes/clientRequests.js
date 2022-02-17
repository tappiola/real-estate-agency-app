const express = require('express');

const clientRequestsController = require('../controllers/clientRequests');

const router = express.Router();

router.post('/', clientRequestsController.addMessage);

module.exports = router;