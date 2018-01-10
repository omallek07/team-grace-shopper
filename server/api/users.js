const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function myCoolFn () {
  return Book.findAll()
}

async function myApp () {
  const books = await myCoolFn()
}

router.get('/', async (req, res, next) => {
  try {
    const booksPromise = myCoolFn()
    const usersPromise = User.findAll()

    const books = await booksPromise
    const users = await usersPromise

    res.json({ books, users })
    res.json(users)
  }
  catch (error) {
    next(error)
  }
})
