const router = require('express').Router()
const {Book, Genre, Author} = require('../db/models')


/*
router.get('/api/books', async (req, res, next) => {
  const books = await Book.findAll()

  res.json(books)
})
*/
router.get('/', async (req, res, next) => {
  const booksPromise = await Book.findAll()
  res.json(booksPromise)
  // let books = await booksPromise
  // let genrePromiseArray = []
  // let authorPromiseArray = []

  // books.forEach(book => {
  //   genrePromiseArray.push(book.getGenres())
  //   authorPromiseArray.push(book.getAuthors())
  // })

  // let bookArray = books.map(async (book, i) => {
  //   let genres = await genrePromiseArray[i]
  //   let authors = await authorPromiseArray[i]
  //   return {...book, genres, authors}
  // })
  
  // res.json(bookArray)
})

module.exports = router
