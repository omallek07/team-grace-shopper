const router = require('express').Router()
const { Order, Address, LineItems, Book } = require('../db')

module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    let cart
    let id
    let lineItems
    if (req.user.id) {
      cart = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        }, include: {
          all: true
        }
      })
      cart = cart[0]
      id = cart.id

      lineItems = await LineItems.findAll({
        where: {
          orderId: id
        },
        include: [{ model: Book, include:{all:true} }]
      })

      cart = {id: cart.id, address: cart.address, userId: cart.userId, lineItems}

      res.json(cart)
      // let books = await Promise.all(cart.lineItems.map(lineItem => lineItem.getBook()))

      // cart.lineItems = cart.lineItems.map((lineItem, i) => ({...lineItem, book: [books[i]]}))

      // res.json(cart[0])
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

// Gets all orders for logged in Admin
router.get('/adminAllOrders', async (req, res, next) => {
  let allOrders = await Order.findAll({
    include: {
      all: true
    }
  })
  res.json(allOrders)
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
    if (lineItem[0].orderQuantity) {
      orderQuantity += lineItem[0].orderQuantity
    }
    console.log(lineItem)
    lineItem = await lineItem[0].update({ orderQuantity })
    if (typeof lineItem === 'number') {
      lineItem = {lineItem: 'destroyed'}
    }
    res.json(lineItem)
  }
  catch (err) {
    console.error(err)
    res.json([])
  }
})
