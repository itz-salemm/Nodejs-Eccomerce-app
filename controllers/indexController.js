const User = require('../models/User');
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const { signupValidation, signinValidation } = require('./validate')
const bcrypt = require('bcryptjs')

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

const signinPage = (req, res) => {
	res.render('signin')
}

const getsigninPage = async (req, res) => {
    const {error} = signinValidation({email:req.body.email, password:req.body.password})
    if(error) return res.send(error.details[0].message)

    const { email, password } = req.body;

     // Check if email exist
    const user = await User.findOne({email: email})
    if(!user) return res.status(400).send("Email does not exist")
    //check password
    const validpass = await bcrypt.compare(password, user.password)
    if(!validpass) return res.status(400).send("Wrong password")

	res.render('signin')
}

const signupPage = (req, res) => {
	res.render('signup')
}

const getsignupPage = async (req, res) => {
	const {error} = signupValidation({first_name: req.body.first_name, last_name: req.body.last_name, email:req.body.email, password:req.body.password})
    if(error) return res.send(error.details[0].message)

    // Check if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")

    if( req.body.password !== req.body.confirm_password) return res.status(400).send("password do not mactch")

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashpassword
    })

    try {
        const savedUser = await user.save()
        res.render('index')
    }
    catch(err) {
        res.status(400).send(err)
    }
}

module.exports = {
  homePage,
  productsPage,
  aboutPage,
  contactPage,
  cartPage,
  // singleProductPage
  signinPage,
  signupPage,
  getsignupPage,
  getsigninPage

}