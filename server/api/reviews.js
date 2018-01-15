const router = require('express').Router()
const {Review, Book } = require('../db')

module.exports = router

// Get all reviews by single user
router.get('/:userId', async (req, res, next) => {
  let userReviews = await Review.findAll({
    include: [{
      model: Book,
      attributes: ['id', 'title', 'photoUrl']
    }],
    where: {
    userId: req.params.userId
  },
})
  res.json(userReviews)
})

router.put('/', async (req, res, next) => {

  try {
    let review = await Review.findOrCreate({
      where: {
        bookId: req.body.bookId,
        userId: req.user.id
      },
      include: {
        all: true
      }
    })
    review = review[0]
    if (req.body.rating) {
      review = await review.update({ rating: req.body.rating })
    }
    if (req.body.comment) {
      review = await review.update({ comment: req.body.comment })
    }

    res.json(review)
  }
  catch (err) {
    console.log(err)
  }
})
