//-- Include packages & define related varibles
const express = require('express')
const exphbrs = require('express-handlebars')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose') // Connect to DB

const app = express()
const port = 3000

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