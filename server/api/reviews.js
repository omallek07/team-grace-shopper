const router = require('express').Router()
const { Review } = require('../db')
module.exports = router

// Get all reviews by single user
router.get('/:userId', async (req, res, next) => {
  let userReviews = await Review.findAll({
    where: {
      userId: req.params.userId
    },
    include: {
      all: true
    }
  })
  res.json(userReviews)
})

router.put('/', async (req, res, next) => {

  try {
    let review = await Review.findOrCreate({
      where: {
        bookId: req.body.bookId,
        userId: req.user.id
      }
    })
    if (req.body.rating) {
      review = await review.update({ rating: req.body.rating })
    }
    if (req.body.comment) {
      review = await review.update({ comment: req.body.comment })
    }

    res.json(review)
  }
  catch (err) {
    next(err)
  }
})
