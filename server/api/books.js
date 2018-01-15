const router = require('express').Router()
const {Book, Review} = require('../db')


module.exports = router

//get reviews for particular book
router.get('/:id/reviews', async (req, res, next) => {
  let bookReview = Review.findAll({
    where: {
      bookId: req.params.id
    },
    include: {
      all: true
    }
  })
  let book = await bookReview;
  res.json(book)
});

// Search book title by query
router.get('/title/:query', (req, res, next) => {
  const query = req.params.query.slice(1, req.params.query.length)
  Book.findAll({
    attributes: ['id', 'description', 'title'],
    limit: 4,
    where: {
      title: { $iLike: `%${query}%`
      },
    }
  })
  .then(matchingBooks => res.json(matchingBooks))
  .catch(next)
})

//get book by id
router.get('/:id', async (req, res, next) => {
  let bookPromise = Book.findById(req.params.id, {include:
    { all: true }})
  let book = await bookPromise;
  res.json(book)
});

router.get('/', async (req, res, next) => {
  let booksPromise = Book.findAll({include: {
    all: true}
  })
  let books = await booksPromise
  res.json(books)
});
