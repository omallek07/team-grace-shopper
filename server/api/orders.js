const router = require('express').Router()
const { Order, LineItems, Book } = require('../db')
const nodemailer = require('nodemailer');
module.exports = router

function getCart(req) {
  if (req.user) {
    return Order.findOrCreate({
      where: {
        status: 'cart',
        userId: req.user.id,
      }
    })
      .then(order => order[0])
  }
  else {
    return Order.findOrCreate({
      where: {
        status: 'cart',
        sid: req.session.id,
      }
    })
      .then(order => order[0])
  }
}

router.get('/cart', async (req, res, next) => {
  try {
    const cart = await getCart(req)
    const id = cart.id

    const lineItems = await LineItems.findAll({
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


// Find all orders by user
router.get('/userId', async (req, res, next) => {
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
        { userId: req.user.id }
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
    let cart = await getCart(req)
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
    let cart = await getCart(req)
    let orderId = cart.id;
    let bookId = req.params.bookId
    await LineItems.destroy(
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
    let cart
    cart = await getCart(req)
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

    if (stockCheck.filter(x => x[2]).length === stockCheck.length) {
      await Promise.all(stockCheck.map(x => {
        let [book, orderQuantity, bool] = x
        let stockQuantity = book.stockQuantity - orderQuantity
        return book.update({ stockQuantity })
      }))
      let addressId

      if (req.body.address) {
        addressId = req.body.address.id
      }
      else {
        addressId = req.user.address.id
      }

      if (req.user) {
        await cart.update({
          status: 'processing',
          userId: req.user.id,
          addressId: addressId,
          purchaseTime: Date.now()
        })
      } else {
        await cart.update({
          status: 'processing',
          purchaseTime: Date.now(),
          addressId: addressId
        })
      }
    }
    else {
      try {
        await cart.update({
          status: 'cancelled',
        })
      }
      catch (err) {
        next(err)
      }
      throw new Error('shit, dog. you ordered more of something than was in stock')
    }
    res.json('success')
  }
  catch (err) {

    res.status(500).send(err)
  }
})

router.post('/email', async (req, res, next) => {
  try {
    let toEmail;
    if (req.user) {
      toEmail = req.user.email
    }
    else {
      toEmail = req.body.email
    }
    let cart = await getCart(req)
    let lineItems = await LineItems.findAll({
      where: {
        orderId: cart.id
      },
      include: {
        all: true
      }
    })
    let books = lineItems.map(item=>item.book)
    let html = '<div> <h2>Order Details are below:</h2><br />'
    for (let i=0; i<books.length; i++){
      html += '<div>'
      html += '<img src = "'+books[i].photoUrl+'" height=150 width=90/><br />'
      html += '<b>'+books[i].title+'</b><br />'
      html += 'quantity is : '+ lineItems[i].orderQuantity+'<br />'
      html += 'price for this book is : $'+books[i].currentPrice/100+'<br />'
      html += '</div><br />'
    }
    html += '</div>'
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "examplecody@gmail.com",
        pass: "examplecode"
      }
    })

    var mailOptions = {
      to: toEmail,
      subject: 'Order is Placed',
      html: html
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
        res.send("Email sent");
      }
    });
  }
  catch (err) {
    console.log(err)
  }
})
