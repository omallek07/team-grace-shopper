const Address = require('./address');
const Author = require('./author');
const Genre = require('./genre');
const LineItems = require('./lineItems');
const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const User = require('./user');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
 User.belongsTo(Address);
 Product.belongsToMany(Author, {through: 'bookAuthors'});
 Author.belongsToMany(Product, {through: 'bookAuthors'});
 Product.belongsToMany(Genre, {through: 'categories'});
 Genre.belongsToMany(Product, {through: 'categories'});
 Order.belongsTo(User)
 Order.belongsTo(Address)
 // Order.belongsTo(Session)
 LineItems.belongsTo(Order)
 LineItems.belongsTo(Product)
 Review.belongsTo(User)
 Review.belongsTo(Product)

 module.exports = {
   Address,
   Author,
   Genre,
   LineItems,
   Order,
   Product,
   Review,
   User
 }
