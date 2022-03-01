const express = require('express');
const router = express.Router();

const blogController = require('../controllers/indexController');

router.get('/', blogController.homePage)
router.get('/products', blogController.productsPage)
// router.post('/product/:id', blogController.singleProductsPage)
router.get('/about', blogController.aboutPage)
router.get('/contact', blogController.contactPage)
router.get('/cart', blogController.cartPage)
// router.post('/add-to-cart/:id', blogController.homePage)

module.exports = router;