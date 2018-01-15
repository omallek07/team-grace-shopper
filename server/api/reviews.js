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

