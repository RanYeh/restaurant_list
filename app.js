//-- Include packages & define related varibles
const express = require('express')
const mongoose = require('mongoose')
const exphbrs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

//-- Set static files
app.use(express.static('public'))

//-- Set routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurantId)
  
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req,res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.category.includes(keyword) || restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//-- Start and listen on the express server
app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})