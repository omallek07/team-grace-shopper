const router = require('express').Router()
const { Order, Address, LineItems, Book } = require('../db')

module.exports = router

function getCart(sessionId) {
  return Order.findOrCreate({
    where: {
      sid: sessionId,
      status: 'cart'
    }
  })
  .then(order => order[0])
}

router.get('/cart', async (req, res, next) => {
  try {
    let cart
    let id
    let lineItems

    cart = await getCart(req.session.id)
    // console.log(cart)
    id = cart.id

    lineItems = await LineItems.findAll({
      where: {
        orderId: id
      },
      include: [{
        model: Book,
        include: {
          all: true
        }
      }]
    })

    // console.log(lineItems)

    res.json(lineItems)
    // let books = await Promise.all(cart.lineItems.map(lineItem => lineItem.getBook()))

    // cart.lineItems = cart.lineItems.map((lineItem, i) => ({...lineItem, book: [books[i]]}))

    // res.json(cart[0])
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  let order = await Order.findById(1)
  res.json(order)
})

// Find all orders by user
router.get('/:userId', async (req, res, next) => {
  let userOrder = await Order.findAll({where:
     {userId: req.params.userId},
     include: {
       all: true
     }
  })
  res.json(userOrder)
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
    // console.log(req.body)
    let cart = await getCart(req.session.id)

    let orderId = cart.id

    let bookId = req.body.bookId

    let orderQuantity = req.body.orderQuantity

    let lineItem = await LineItems.findOrCreate({
      where: {
        orderId, bookId
      }, include: {
        all: true
      }
    })

    if (!orderQuantity) {
      orderQuantity = lineItem[0].orderQuantity + 1
    }

    // console.log(lineItem)
    lineItem = await lineItem[0].update({ orderQuantity })
    if (typeof lineItem === 'number') {
      lineItem = { lineItem: 'destroyed' }
    }
    res.json(lineItem)
  }
  catch (err) {
    console.error(err)
    res.json([])
  }
})
