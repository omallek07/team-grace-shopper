import { isatty } from 'tty';

const {db} = require('../index')
const { expect } = require('chai')

const Product = db.model('product')

describe('Product model', () => {

  let ourProduct

  const defData = {
    title: 'Children of Time',
    description: 'book about an advanced spider civilization and humanity on the brink of extinction',
    stockQuantity: 69,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/512TBFMt7aL._SX323_BO1,204,203,200_.jpg',
    currentPrice: 14.99,
    ratingSum: 420,
    numberOfRatings: 104
  }

  function createTestProduct(testData) {
    let data = { ...defData, ...testData }
    return Product.create(data)
  }

  let newTest
  beforeEach(() => {
    newTest = undefined
    return createTestProduct()
      .then(product => {
        ourProduct = product
      })
  })

  describe('title property', () => {

    it('has title, which is required', () => {

      expect(ourProduct.title, 'takes a valid title').to.be.equal('Children of Time')
      return createTestProduct({ title: null })
        .then(product => {
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

      expect(ourProduct.description, 'takes a valid string').to.be.equal('book about an advanced spider civilization and humanity on the brink of extinction')
      return createTestProduct({ description: null })
        .then(product => {
          newTest = product
          expect(product.description, 'allows null').to.be.equal(null)
        })
        .catch(err => {
          throw err
        })
      // createTestProduct({description:})

    })
  })
  describe('stockQuantity', () => {

    it('has stockQuantity, defaults to 0, no negatives', () => {
      expect(ourProduct.stockQuantity, 'takes valid quantity').to.be.equal(69)
      return createTestProduct({ stockQuantity: undefined })
        .then(product => {
          expect(product.stockQuantity, 'defaults to 0').to.be.equal(0)
        })
        .catch(err => {
          throw err
        })
    })
    it('stockQuantity disallows negatives', () => {
      return createTestProduct({ stockQuantity: -5 })
        .then(product => {
          throw 'ALLOWED NEGATIVES -5 WAS BAD'
        })
        .catch(err => {
          expect(err).to.be.instanceOf(Error)
        })
    })
  })

  describe('PhotoUrl', () => {

    it('defaults to bozo', () => {
      return createTestProduct({ photoUrl: undefined })
        .then(product => {
          expect(product.photoUrl).to.be.equal('https://us.toluna.com/dpolls_images/2016/03/12/63ead037-37fb-48cc-8952-60b941602492_x300.jpg')
        })
    })

    it('takes valid URL', () => {
      expect(ourProduct.photoUrl).to.be.equal('https://images-na.ssl-images-amazon.com/images/I/512TBFMt7aL._SX323_BO1,204,203,200_.jpg')
    })

  })

  describe('currentPrice', () => {
    it('takes valid price (decimal)', () => {
      expect(ourProduct.currentPrice).to.be.equal('14.99')
    })

    it('does not allow null', () => {
      return createTestProduct({currentPrice: undefined})
      .then(product => {
        throw 'INCORRECTLY ALLOWED NULL'
      })
      .catch(err => {
        expect(err).to.be.instanceOf(Error)
      })
    })
  })

  describe('ratingSum', () => {
    it('defaults to 0 (for initialization)', () => {
      return createTestProduct({ratingSum: undefined})
      .then(product => {
        expect(product.ratingSum).to.be.equal(0)
      })
      .catch(console.error)
    })
  })

  describe('numberOfRatings', () => {
    it('default to 0 (for initialization', () => {
      return createTestProduct({numberOfRatings: undefined})
      .then(product => {
        expect(product.numberOfRatings).to.be.equal(0)
      })
      .catch(console.error)
    })
  })

  describe('averageRating virtual getter', () => {

    it('defaults to 0 (ie, if numberOfRatings is equal to 0)', () => {
      return createTestProduct({numberOfRatings: undefined})
      .then(product => {
        expect(product.averageRating).to.be.equal(0)
      })
    })

    it('gets the average rating (ie, ratingSum / numberOfRatings', () => {
      expect(ourProduct.averageRating).to.be.equal(420/104)
    })

  })

})
