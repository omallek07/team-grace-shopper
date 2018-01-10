const router = require('express').Router()
const {Book, Genre, Author} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const booksPromise = Book.findAll()

  let books = await booksPromise
  let genrePromiseArray = []
  let authorPromiseArray = []

  books.forEach(book => {
    genrePromiseArray.push(book.getGenres())
    authorPromiseArray.push(book.getAuthors())
  })

  let bookArray = books.map(async (book, i) => {
    let genres = await genrePromiseArray[i]
    let authors = await authorPromiseArray[i]
    return {...book, genres, authors}
  })

  res.json(bookArray)

})
