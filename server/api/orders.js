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

// Gets all orders for logged in Admin
router.get('/adminAllOrders', async (req, res, next) => {
  let allOrders = await Order.findAll({
    include: {
      all: true
    }
  })
  res.json(allOrders)
})

// Find all orders by user
router.get('/:userId', async (req, res, next) => {
  let userOrder = await Order.findAll({
    where:
      { userId: req.params.userId },
    include: {
      all: true
    }
  })
  res.json(userOrder)
})


router.get('/', async (req, res, next) => {
  let order = await Order.findById(1)
  res.json(order)
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
    next(err)
  }
})


router.delete('/cart/:bookId', async (req, res, next) => {
  try {
    let cart = await getCart(req.session.id);
    let orderId = cart.id;
    let bookId = req.params.bookId
    let lineItem = await LineItems.destroy(
      {
        where: {
          orderId,
          bookId
        }
      });
    res.status(204).end();
  }
  catch (err) {
    console.error(err)
  }
})

router.put('/checkout', async (req, res, next) => {

  try {

    let cart = await getCart(res.session.id)

    let lineItems = await LineItems.findAll({
      where: {
        id: cart.id
      },
      include: {
        all: true
      }
    })

    let stockCheck = await Promise.all(lineItems.map(item => {
      let orderPrice = item.book.currentPrice
      return item.update({ orderPrice })
        .then(() => Book.findById(item.bookId))
        .then(book => [book, item.orderQuantity, book.stockQuantity >= item.orderQuantity])
    }))

    if (stockCheck.filter(x => x[1]) === stockCheck) {
      await Promise.all(stockCheck.map(x => {
        let [book, orderQuantity, bool] = x
        let stockQuantity = book.stockQuantity - orderQuanity
        return book.update({ stockQuantity })
      }))

      if (req.user.id) {
        await cart.update({
          status: 'processing',
          userId: req.user.id,
          purchaseTime: Date.now()
        })
      } else {
        await cart.update({
          status: 'processing',
          purchaseTime: Date.now()
        })
      }

    } else {
      throw new Error("shit, dog. you ordered more of something than was in stock")
    }



    res.json('success')

  }
  catch (err) {
    next(err)
  }


})
