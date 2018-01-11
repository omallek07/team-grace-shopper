const router = require('express').Router()
const {Book} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  let booksPromise = Book.findAll({include: {
    all: true}
  })

  let books = await booksPromise

  res.json(books)
});
