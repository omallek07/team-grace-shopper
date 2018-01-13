const router = require('express').Router()
const {Review} = require('../db')
module.exports = router

// Get all reviews by single user
router.get('/:userId', async (req, res, next) => {
  let userReviews = await Review.findAll({ where: {
    userId: req.params.userId
  },
  include: {
    all: true
  }
})
  res.json(userReviews)
})

