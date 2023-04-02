const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  // 首頁
  Restaurant
    .find() // 取出 Restaurant model 裡的所有資料
    .lean() // 將 monggose 的 model 物件轉換成乾淨的 js 資料陣列
    .sort({ _id: 'asc' })
    .then(restaurantsData => res.render('index', { restaurants: restaurantsData }))
    .catch(error => console.error(error))
})

module.exports = router