const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  streetOne: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streetTwo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      min: 10000,
      max: 99999
    }
  }
})

module.exports = Address
