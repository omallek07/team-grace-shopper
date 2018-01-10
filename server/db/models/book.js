const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://us.toluna.com/dpolls_images/2016/03/12/63ead037-37fb-48cc-8952-60b941602492_x300.jpg'
  },
  currentPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ratingSum: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  numberOfRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  averageRating: {
    type: Sequelize.VIRTUAL,
    get () {
      if (this.numberOfRatings === 0) {
        return 0
      } else {
        return this.ratingSum / this.numberOfRatings
      }
    }
  }
})



module.exports = Book

/*

Ratings table:

User ID
Product ID
rating


Reviews table:
User ID
Product ID
comment
ratingID

write a review:
sequelize  -> findorcreate rating
.then(ratingID => Review.create(userID, prodID, ratingID, comment)

*/
