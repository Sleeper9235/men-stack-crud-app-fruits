// connect to dotenv and loads the enviorment variable from .env file
const dotenv = require('dotenv').config()
// connects to express
const express = require('express')
const mongoose = require('mongoose')

const app = express();

mongoose.connect(process.env.MONGODB_URI)
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Fruit = require('./models/fruit.js')

//middleware
app.use(express.urlencoded({ extended: false }))

// GET /
app.get("/", async (req, res) => {
    res.render('index.ejs');
})
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render('./fruits/new.ejs')
})

// Post /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body)
    res.redirect('/fruits/new')
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})