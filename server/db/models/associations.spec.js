const {expect} = require('chai')
const {
  Address,
  Author,
  Genre,
  LineItems,
  Order,
  Product,
  Review,
  User
} = require('./index')

describe('Model Associations', () => {

  let ourAddress
  let ourGenre
  let ourAuthor

  beforeEach(() => {

    return Address.create({
      streetOne: '69 Boner Avenue',
      streetTwo: 'apt 69',
      city: 'Chicago',
      state: 'IL',
      zip: 60657
    })
    .then(address => {
      ourAddress = address
      return Genre.create({
        name: 'science-fiction'
      })
    })
    .then(genre => {
      ourGenre = genre
      return Author.create({
        firstName: 'Adrian',
        lastName: 'Tchaikovsky'
      })
    })
    .then(author => {
      ourAuthor = author
      return
    })

  })


})
