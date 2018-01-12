const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['cart', 'processing', 'cancelled', 'completed']
  },
  purchaseTime: {
    type: Sequelize.DATE,
  },
  sid: {
    type: Sequelize.STRING
  }
})

module.exports = Order
