const Sequelize = require('sequelize')
const db = require('../db')

const LineItems = db.define('lineItems',{
  orderQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  orderPrice: {
    type: Sequelize.DECIMAL
  }
})

module.exports = LineItems;
