const router = require('express').Router()
module.exports = router

const adminGateway = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  }
  else {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
  }
}

router.use('/users', require('./users'))

router.use('/books', require('./books'))

router.use('/genres', require('./genres'))

//adminGateway to check if user isAdmin
router.use('/admin', adminGateway)

router.use('/admin', require('./admin'))

router.use('/orders', require('./orders'))

router.use('/reviews', require('./reviews'))

router.use('/address', require('./address'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
