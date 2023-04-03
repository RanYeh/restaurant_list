const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sortRestaurants = require('../../sort_restaurants')

router.get('/', (req, res) => {
  // 搜尋頁面
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  
  Restaurant.find()
    .lean()
    .sort(sortRestaurants(sort))
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(restaurant => {
        return restaurant.category.includes(keyword) || restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants, keyword })
    })
})

module.exports = router