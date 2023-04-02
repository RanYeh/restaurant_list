const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:restaurantId', (req, res) => {
  // 瀏覽特定餐廳頁面
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('show', { restaurant: restaurantData }))
    .catch(error => console.error(error))
})

router.get('/new', (req, res) => {
  // 新增餐廳頁面
  res.render('new')
})

router.post('/', (req, res) => {
  // 新增餐廳
  Restaurant.create(req.body)
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:restaurantId/edit', (req, res) => {
  // 餐廳資訊編輯頁面
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurant: restaurantData }))
    .catch(err => console.log(err))
})

router.put('/:restaurantId', (req, res) => {
  // 編輯餐廳資訊
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

router.delete('/:restaurantId', (req, res) => {
  // 刪除餐廳
  const restaurantId = req.params.restaurantId
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router