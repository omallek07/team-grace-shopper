const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {

  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// Update user admin status as an admin
router.put('/adminAllUsers/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(foundUser => foundUser.update({isAdmin: req.body.status }))
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})

// Delete user as an admin
router.delete('/adminAllUsers/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(foundUser => foundUser.destroy())
  .then(() => (res.sendStatus(204)))
  .catch(next)
})

//Grabs all users as an admin
router.get('/adminAllUsers', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
  })
  .then(allUsers => res.json(allUsers))
  .catch(next)
})
