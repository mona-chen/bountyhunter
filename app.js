require('dotenv').config()
const express = require('express')
const routes = require('./route')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(() => { 
        //listen for requests
app.listen(process.env.PORT || 4500, (req, res) => {
    console.log('🚀 bounty hunter up on port 4500')
})
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/api/' , routes)
  

