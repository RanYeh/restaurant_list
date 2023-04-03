// define sortRestaurants function
function sortRestaurants(sortQuery) {
  let sortMethod = ''
  
  switch (sortQuery) {
    case 'ascent':
      sortMethod = { name: 'asc' }
      break
    case 'decent':
      sortMethod = { name: 'desc' }
      break
    case 'category':
      sortMethod = { category: 'asc' }
      break
    case 'location':
      sortMethod = { location: 'asc' }
      break
  }

  return sortMethod
}

module.exports = sortRestaurants