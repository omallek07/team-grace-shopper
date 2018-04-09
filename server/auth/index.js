const router = require('express').Router()
const User = require('../db/models/user')
const { Order, Address } = require('../db')
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
  try {
    const { email, password, firstName, lastName, streetOne, streetTwo, city, state, zip } = req.body

    let ourAddress = await Address.create({streetOne, streetTwo, city, state, zip})
    let cart = await Order.find({
      where: {
        sid: req.session.id,
        status: 'cart'
      }
    })
    User.create({ email, password, firstName, lastName, addressId: ourAddress.id})
      .then(user => {
        return User.findOne({where:{id:user.id},include:{all:true}})
        .then((ourUser) => {
          return cart.update({
            userId: ourUser.id,
            sid: null
          })
          .then(() => {
            req.login(ourUser, err => (err ? next(err) : res.json(ourUser)))
          })
        })
      })


  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  // req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log(req.user);
  console.log('SESSION:', req.session.id);
  res.json(req.user)
});

router.use('/google', require('./google'))
