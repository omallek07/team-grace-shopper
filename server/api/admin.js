const router = require('express').Router()
const {User, Order, Address, LineItems, Book, Genre, Author} = require('../db/models')
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
  Order.findById(req.params.orderId, {
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


// Admin can create book with authorId and GenreId created
router.post('/books/', (req, res, next) => {
  let authorId;
  let genreId;

  Author.findOrCreate((req.body[0], { where: {
      lastName: req.body[0].lastName
    }}))
    .spread((author, created) => {
      authorId = author.id
    })
    .catch(next)

  Genre.findOrCreate((req.body[1], { where: {
    name: req.body[1].name
    }}))
    .spread((genre, created) => {
    genreId = genre.id
    })
    .catch(next)

  if (authorId && genreId) {
    Book.create(req.body[2])
    .then(newBook => res.json(newBook))
    .catch(next)
  }
});


// Admin can update Book details
router.put('/books/:bookId', (req, res, next) => {
  console.log('update', req.body)
  Book.findById(req.params.bookId)
  .then(foundBook => foundBook.update(req.body))
  .then(updatedBook => res.json(updatedBook))
  .catch(next)
})

// Admin can delete Book
router.delete('/books/:bookId', (req, res, next) => {
  console.log(req.body)
  Book.findById(req.params.bookId)
  .then(foundBook => foundBook.delete())
  .then(() => res.sendStatus(201))
  .catch(next)
})
