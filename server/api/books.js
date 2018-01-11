const router = require('express').Router()
const {Book} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  let booksPromise = Book.findAll()

  let books = await booksPromise

  let genrePromiseArray = Promise.all(books.map(book => {
    return book.getGenres()
    .then(genres => genres[0] && genres.map(genre => (
      {id: genre.dataValues.id, name: genre.dataValues.name}
    )))
  })).catch(console.error)

  let authorPromiseArray = Promise.all(books.map(book => {
    return book.getAuthors()
    .then(authors => authors[0] && authors.map(author => (
      {id: author.dataValues.id, firstName: author.dataValues.firstName, lastName: author.dataValues.lastName}
    )))
  })).catch(console.error)

  const genreArray = await genrePromiseArray
  const authorArray = await authorPromiseArray

  let bookArray = books.map((book, i) => {
    let genres = genreArray[i]
    let authors = authorArray[i]

    let product = {...book.dataValues, genres, authors}

    return product
  })

  res.json(bookArray)
})
