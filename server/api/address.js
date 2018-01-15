const router = require('express').Router()
const {Address} = require('../db')

module.exports = router

router.post('/', async (req, res, next) => {
  const address = await Address.create(req.body)
  res.send(address)
})
