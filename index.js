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


app.get('/', (req,res) => {
	res.send("A Microservice Ecommerce app")
})


const port = process.env.PORT || 5000
app.listen(3000, () => {
	console.log("Server Running on port " + port)
})