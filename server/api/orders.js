const router = require('express').Router()
const { Order, User, Address, LineItems, Book } = require('../db')

module.exports = router

function getCart(sessionId, userId) {
  if (userId){
    return Order.findOrCreate({
      where: {
        status: 'cart',
        userId: userId,
      }
    })
      .then(order => order[0])
  }
  else {
    return Order.findOrCreate({
      where: {
        status: 'cart',
        sid: sessionId,
      }
    })
      .then(order => order[0])
  }
}

router.get('/cart/:userId', async (req, res, next) => {
  try {
    console.log('hello from route')
    let cart
    let id
    let lineItems
    if (req.params.userId === 'undefined'){
        if(req.user){
          cart = await getCart(req.session.id, req.user.id)
        }
        else{
          cart = await getCart(req.session.id)
        }
    }
    else {
      cart = await getCart(req.session.id, req.params.userId)
    }

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
    res.json(lineItems)
  }
  catch (err) {
    next(err)
  }
})

// Gets all orders for logged in Admin
router.get('/adminAllOrders', async (req, res, next) => {
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

//Admin can update order status
router.put('/adminAllOrders/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(matchingOrder => {
    matchingOrder.update({status: req.body.status})
  .then(updatedOrder => {
    res.json(updatedOrder)
  })
  .catch(next)
  })
})

// Find all orders by user
router.get('/:userId', async (req, res, next) => {
  try {
    let userOrder = await Order.findAll({
    include: [{
      model: LineItems,
        include: [{
          model: Book,
          attributes: ['id', 'title', 'stockQuantity', 'currentPrice', 'photoUrl']
        }]
      }],
    where:
      { userId: req.params.userId }
    })
    res.json(userOrder)
  }
  catch (err) { next(err) }
})


router.get('/', async (req, res, next) => {
  let order = await Order.findById(1)
  res.json(order)
})

router.put('/cart', async (req, res, next) => {
  try {
    let cart = await getCart(req.session.id, req.body.userId)
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


router.delete('/cart/:bookId/:userId', async (req, res, next) => {
  try {
    let cart;
    if (req.params.userId === 'undefined'){
        cart = await getCart(req.session.id)
    }
    else {
      cart = await getCart(req.session.id, req.params.userId)
    }
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

router.post('/checkout', async (req, res, next) => {

  try {
    let userId
    let cart
    if (req.user){
      userId = req.user.id
      cart = await getCart(req.session.id, userId)
    }
    else {
      cart = await getCart(req.session.id)
    }
    let lineItems = await LineItems.findAll({
      where: {
        orderId: cart.id
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

    console.log('length is',stockCheck.filter(x=>x[2]).length)
    console.log('stockCheck length is', stockCheck.length)
    if (stockCheck.filter(x => x[2]).length === stockCheck.length ) {
      await Promise.all(stockCheck.map(x => {
        let [book, orderQuantity, bool] = x
        let stockQuantity = book.stockQuantity - orderQuantity
        return book.update({ stockQuantity })
      }))
console.log('hello')
      if (req.user) {
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

    }
    else {
      throw new Error('shit, dog. you ordered more of something than was in stock')
    }

    res.json('success')

  }
  catch (err) {
    next(err)
  }
})
