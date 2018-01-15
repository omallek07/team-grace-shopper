const {db} = require('../index')
const { expect } = require('chai')

const Book = db.model('book')

describe('Book model', () => {

  let ourBook

  const defData = {
    title: 'Children of Time',
    description: 'book about an advanced spider civilization and humanity on the brink of extinction',
    stockQuantity: 69,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/512TBFMt7aL._SX323_BO1,204,203,200_.jpg',
    currentPrice: 14.99,
  }

  function createTestBook(testData) {
    let data = { ...defData, ...testData }
    return Book.create(data)
  }

  let newTest
  beforeEach(() => {
    newTest = undefined
    return createTestBook()
      .then(book => {
        ourBook = book
      })
  })

  describe('title property', () => {

    it('has title, which is required', () => {

      expect(ourBook.title, 'takes a valid title').to.be.equal('Children of Time')
      return createTestBook({ title: null })
        .then(book => {
          throw 'ummmm, whaaaa? lol jk'
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error)
          expect(newTest, 'does not allow null').to.be.equal(undefined)
        })
    })
  })

  describe('description property', () => {

    it('has description, not required', () => {

      expect(ourBook.description, 'takes a valid string').to.be.equal('book about an advanced spider civilization and humanity on the brink of extinction')
      return createTestBook({ description: null })
        .then(book => {
          newTest = book
          expect(book.description, 'allows null').to.be.equal(null)
        })
        .catch(err => {
          throw err
        })
      // createTestBook({description:})

    })
  })
  describe('stockQuantity', () => {

    it('has stockQuantity, defaults to 0, no negatives', () => {
      expect(ourBook.stockQuantity, 'takes valid quantity').to.be.equal(69)
      return createTestBook({ stockQuantity: undefined })
        .then(book => {
          expect(book.stockQuantity, 'defaults to 0').to.be.equal(0)
        })
        .catch(err => {
          throw err
        })
    })
    it('stockQuantity disallows negatives', () => {
      return createTestBook({ stockQuantity: -5 })
        .then(book => {
          throw 'ALLOWED NEGATIVES -5 WAS BAD'
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error)
        })
    })
  })

  describe('PhotoUrl', () => {

    it('defaults to bozo', () => {
      return createTestBook({ photoUrl: undefined })
        .then(book => {
          expect(book.photoUrl).to.be.equal('https://us.toluna.com/dpolls_images/2016/03/12/63ead037-37fb-48cc-8952-60b941602492_x300.jpg')
        })
    })

    it('takes valid URL', () => {
      expect(ourBook.photoUrl).to.be.equal('https://images-na.ssl-images-amazon.com/images/I/512TBFMt7aL._SX323_BO1,204,203,200_.jpg')
    })

  })

  describe('currentPrice', () => {
    it('takes valid price (decimal)', () => {
      expect(ourBook.currentPrice).to.be.equal('14.99')
    })

    it('does not allow null', () => {
      return createTestBook({currentPrice: undefined})
      .then(book => {
        throw 'INCORRECTLY ALLOWED NULL'
      })
      .catch(err => {
        expect(err).to.be.instanceOf(Error)
      })
    })
  })

  describe('ratingSum', () => {
    it('defaults to 0 (for initialization)', () => {
      return createTestBook({ratingSum: undefined})
      .then(book => {
        expect(book.ratingSum).to.be.equal(0)
      })
      .catch(console.error)
    })
  })

  describe('numberOfRatings', () => {
    it('default to 0 (for initialization', () => {
      return createTestBook({numberOfRatings: undefined})
      .then(book => {
        expect(book.numberOfRatings).to.be.equal(0)
      })
      .catch(console.error)
    })
  })

  describe('averageRating virtual getter', () => {

    it('defaults to 0 (ie, if numberOfRatings is equal to 0)', () => {
      return createTestBook({numberOfRatings: undefined})
      .then(book => {
        expect(book.averageRating).to.be.equal(0)
      })
    })

    it('gets the average rating (ie, ratingSum / numberOfRatings', () => {
      expect(ourBook.averageRating).to.be.equal(420/104)
    })

  })

})
