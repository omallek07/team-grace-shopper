const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  stockQuantity: {
    type: Sequelize.INTEGER
  },
  author: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://us.toluna.com/dpolls_images/2016/03/12/63ead037-37fb-48cc-8952-60b941602492_x300.jpg'
  },
  currentPrice: {
    type: Sequelize.NUMBER
  },
  averageRating: {
    type: Sequelize.VIRTUAL,
    get: () => {
      return 3
    }
  }
})

module.exports = Product

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
