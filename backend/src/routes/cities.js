const express = require('express');

const citiesController = require('../controllers/cities');

const router = express.Router();

router.get('/', citiesController.getCities);

module.exports = router;