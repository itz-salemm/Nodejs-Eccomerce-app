const homePage = (req, res) => {
	try {
		res.render('index')
	} catch (error) {
		console.log(error)
		res.render('index')
	}
}

const productsPage = (req, res) => {
	res.render('products')
}

/* const singleProductPage = (req, res) => {
	res.render('singleProductPage')
} */

const aboutPage = (req, res) => {
	res.render('about')
}

const contactPage = (req, res) => {
	res.render('contact')
}

const cartPage = (req, res) => {
	res.render('cart')
}


module.exports = {
  homePage,
  productsPage,
  aboutPage,
  contactPage,
  cartPage,
  // singleProductPage

}