//-- Include packages & define related varibles
const express = require('express')
const mongoose = require('mongoose')
const exphbrs = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('./models/restaurant')
const routes = require('./routes')

const app = express()
const port = 3000

//-- Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.error('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

//-- Set template engine
app.engine('handlebars', exphbrs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//-- Use bodyParser
app.use(express.urlencoded({ extended: true }))

//-- Use methodOverride
app.use(methodOverride('_method'))

//-- Set static files
app.use(express.static('public'))

//-- Set routes
app.use(routes)

//-- Start and listen on the express server
app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})