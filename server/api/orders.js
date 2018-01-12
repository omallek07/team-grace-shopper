const router = require('express').Router()
const { Order, Address, LineItems } = require('../db')

module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    let cart
    if (req.user.id) {
      cart = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        }, include: [{model: Address}, {model: LineItems}]
      })
      res.json(cart[0])
    } else {
      res.json([])
    }
  }
  catch (err) {
    console.error(err)
  }
})

router.get('/', async (req, res, next) => {
  let order = await Order.findById(1)

  res.json(order)
})

router.put('/cart', async (req, res, next) => {
  try {
    let orderId = req.body.orderId
    let bookId = req.body.bookId
    let orderQuantity = req.body.orderQuantity
    let lineItem = await LineItems.findOrCreate({
      where: {
        orderId, bookId
      }, include: {
        all: true
      }
    })
    lineItem = await lineItem[0].update({orderQuantity})
    res.json(lineItem)
  }
  catch (err) {
    console.error(err)
    res.json([])
  }
})
