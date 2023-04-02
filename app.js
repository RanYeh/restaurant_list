//-- Include packages & define related varibles
const express = require('express')
const mongoose = require('mongoose')
const exphbrs = require('express-handlebars')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

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

//-- Use methodOverride
app.use(methodOverride('_method'))

//-- Set static files
app.use(express.static('public'))

//-- Set routes
app.get('/', (req, res) => {
  // 首頁
  Restaurant
    .find() // 取出 Restaurant model 裡的所有資料
    .lean() // 將 monggose 的 model 物件轉換成乾淨的 js 資料陣列
    .sort({_id: 'asc'})
    .then(restaurantsData => res.render('index', { restaurants: restaurantsData }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:restaurantId', (req, res) => {
  // 瀏覽特定餐廳頁面
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('show', { restaurant: restaurantData }))
    .catch(error => console.error(error))
})

app.get('/search', (req,res) => {
  // 搜尋頁面
  if (!req.query.keyword) {
    return res.redirect('/')
  }
  
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(restaurant => {
        return restaurant.category.includes(keyword) || restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword})
    })
})

app.get('/restaurants/new', (req, res) => {
  // 新增餐廳頁面
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  // 新增餐廳
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/:restaurantId/edit', (req, res) => {
  // 餐廳資訊編輯頁面
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurant: restaurantData }))
    .catch(err => console.log(err))
})

app.put('/restaurants/:restaurantId', (req, res) => {
  // 編輯餐廳資訊
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:restaurantId', (req, res) => {
  // 刪除餐廳
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

//-- Start and listen on the express server
app.listen(port, () => {
  console.log(`Express server is listening on http://localhost:${port}`)
})