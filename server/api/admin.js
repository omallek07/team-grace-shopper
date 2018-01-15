const router = require('express').Router()
const {User, Order, Address, LineItems, Book} = require('../db/models')
module.exports = router


// Update user admin status as an admin
router.put('/users/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(foundUser => foundUser.update({isAdmin: req.body.status }))
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

// Delete user as an admin
router.delete('/users/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(foundUser => foundUser.destroy())
  .then(() => (res.sendStatus(204)))
  .catch(next)
})

//Grabs all users as an admin
router.get('/users', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
  })
  .then(allUsers => res.json(allUsers))
  .catch(next)
})

//Admin can update order status
router.put('/orders/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(matchingOrder => {
    matchingOrder.update({status: req.body.status})
  .then(updatedOrder => {
    res.json(updatedOrder)
  })
  .catch(next)
  })
})

// Gets all orders for logged in Admin
router.get('/orders', async (req, res, next) => {
  try {
    let allOrders = await Order.findAll({
    include: [
      { model: Address },
      { model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: LineItems,
          include: [{ model: Book,
            attributes: ['id', 'title', 'stockQuantity', 'currentPrice', 'photoUrl']
          }]
        }
      ]
    })
    res.json(allOrders)
  }
  catch (err) { next(err) }
})
