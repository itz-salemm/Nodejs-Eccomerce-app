require("dotenv").config()
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')

const app = express()


// Database setup
connectDB()

// View engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoutes = require('./routes/indexRoutes')
app.use('/', indexRoutes)


const port = process.env.PORT || 5000
app.listen(3000, () => {
	console.log("Server Running on port " + port)
})