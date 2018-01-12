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

//Grabs all users as an admin
router.get('/adminAllUsers', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
  })
  .then(allUsers => res.json(allUsers))
  .catch(next)
})
