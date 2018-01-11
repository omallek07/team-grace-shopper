const router = require('express').Router()
const {Genre} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  let genres = await Genre.findAll()

  res.json(genres)
})

router.get('/:genreId', async (req, res, next) => {
  let genrePromise = Genre.findById(req.params.genreId, {include: {
    all: true}
  })

  let books = await genrePromise

  res.json(books)
});
