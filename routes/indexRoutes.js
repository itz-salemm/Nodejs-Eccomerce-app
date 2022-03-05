const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth')

const blogController = require('../controllers/indexController');

router.get('/', verifyAuth, blogController.homePage)
router.get('/products', blogController.productsPage)
// router.post('/product/:id', blogController.singleProductsPage)
router.get('/about', blogController.aboutPage)
router.get('/contact', blogController.contactPage)
router.get('/cart', blogController.cartPage)
// router.post('/add-to-cart/:id', blogController.homePage)
router.get('/signin', blogController.signinPage)
router.post('/signin', blogController.getsigninPage)
router.get('/signup', blogController.signupPage)
router.post('/signup', blogController.getsignupPage)
router.get('/admin', blogController.adminPage)
router.post('/admin', blogController.getadminPage)


module.exports = router;