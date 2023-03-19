//-- Include packages & define related varibles
const express = require('express')
const app = express()
const port = 3000

const exphbrs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

//-- Set template engine
app.engine('handlebars', exphbrs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//-- Set static files
app.use(express.static('public'))

//-- Set routes
app.get('/', (req, res) => {
  res.render('index')
})


//-- Start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})