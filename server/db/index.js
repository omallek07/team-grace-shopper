const db = require('./db')

// register models
const {
  Author,
  Address,
  Genre,
  LineItems,
  Order,
  Book,
  Review,
  User
  } = require('./models')

module.exports = {
  db,
  Author,
  Address,
  Genre,
  LineItems,
  Order,
  Book,
  Review,
  User
}
