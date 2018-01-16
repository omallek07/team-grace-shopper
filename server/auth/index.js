const router = require('express').Router()
const User = require('../db/models/user')
const { Order } = require('../db')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne(
    {
      where: { email: req.body.email },
      include: { all: true }
    })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', async (req, res, next) => {
  const {email, password, firstName, lastName, method} = req.body

  let ourUser
  let cart = await Order.find({
    where: {
      sid: req.session.id,
      status: 'cart'
    }
  })
  User.create({email, password, firstName, lastName, method})
    .then(user => {
      ourUser = user
      return cart.update({
        userId: user.id,
        sid: null
      })
    })
    .then(() => {
      req.login(ourUser, err => (err ? next(err) : res.json(ourUser)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
