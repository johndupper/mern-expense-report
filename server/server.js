require('dotenv').config()
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const dbUrl = `mongodb://${username}:${password}@ds131973.mlab.com:31973/expenses`

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/routes.js')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../client'))

app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use('/', router)

mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => { console.log('connected to mongoDB successfully') })
  .catch(e => { console.error(`could not connect to mongoDB: ${e.message}`) })

module.exports = app
