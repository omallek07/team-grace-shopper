const Sequelize = require('sequelize')
const db = require('../db')

const LineItems = db.define('lineItems', {
  orderQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  orderPrice: {
    type: Sequelize.INTEGER
  }
})

LineItems.afterUpdate((instance) => {
  if (instance.orderQuantity === 0) {
    return LineItems.destroy({
      where: {
        id: instance.id
      }
    })
  }
})

module.exports = LineItems;
