const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      len: [2, 600]
    }
  },
  rating: {
    type: Sequelize.Number,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
