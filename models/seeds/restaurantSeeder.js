const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  console.log('running restaurantSeeder script...')

  Restaurant.create(restaurantList.results)
  .then(() => {
    console.log("restaurantSeeder has generated your data!")
    db.close()
  })
  .catch(error => console.log(error))
})
