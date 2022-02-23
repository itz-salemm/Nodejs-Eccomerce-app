const express = require('express');
const router = express.Router();

const blogController = require('../controllers/indexController');

router.get('/', blogController.ecommerce_index)

module.exports = router;