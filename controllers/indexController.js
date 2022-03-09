const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const { signupValidation, signinValidation } = require('./validate')
const bcrypt = require('bcryptjs')

const homePage = async (req, res) => { 
  try {
    const products = await Product.find({})
    res.render('index', {products})
  } catch(err) {
    console.log(error);
    res.redirect("/");
  }

}

const productsPage = async (req, res) => {
  try {
    const products = await Product.find({})
    res.render('products', {products})
  } catch(err) {
    console.log(error);
    res.redirect("/");
  }
}


const singleProductPage = async (req, res) => {
  const productId = req.params.id;
   try {
    const product = await Product.findOne({_id: productId})
    res.render('singleProductPage', {product})
  } catch(err) {
    console.log(error);
    res.redirect("/");
  }
}

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

    try {
      const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
      res.cookie('access_token', token, { httpOnly: true, maxAge: 1000000 });
      // res.status(200).json({ user: user._id, token })
      res.render('index')
    } catch(err) {
      console.log(err)
      return res.status(400).render('signin')
    }
    res.render('index')
}

const signupPage = (req, res) => {
	res.render('signup')
}

const getsignupPage = async (req, res) => {
  const {first_name, last_name, email, password, confirm_password } = req.body
	const {error} = signupValidation({first_name: first_name, last_name: last_name, email:email, password:password})
    if(error) return res.send(error.details[0].message)

    // Check if email exist
    const emailExist = await User.findOne({email: email})
    if(emailExist) return res.status(400).send("Email already exist")

    if( password !== confirm_password) return res.status(400).send("password do not mactch")

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    const user = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashpassword
    })

    try {
        const savedUser = await user.save()
        res.render('signin')
    }
    catch(err) {
        res.status(400).send(err)
    }
}

const adminPage = (req, res) => {
  res.render('admin')
}

const getadminPage = async (req, res) => {
  const { name, price, description, quantity, image } = req.body
  const product = new Product({
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        imagePath: image
    })

    try {
        const savedProduct = await product.save()
        res.render('index')
    }
    catch(err) {
        res.status(400).send(err)
    }
  res.render('products')
}

module.exports = {
  homePage,
  productsPage,
  aboutPage,
  contactPage,
  cartPage,
  singleProductPage,
  signinPage,
  signupPage,
  getsignupPage,
  getsigninPage,
  adminPage,
  getadminPage
}