const db = require('../index')
const {expect} = require('chai')

const Product = db.model('product')

describe('rating model', () => {

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
    let data = Object.create({}, defData, testData)
    return Product.create(data)
  }
  let newTest
  beforeEach(() => {
    newTest = undefined
    ourProduct = createTestProduct({})
  })

  it('has title, which is required', () => {

    expect(ourProduct.title).to.be.equal('Children of Time')
    newTest = createTestProduct({title: undefined})
    expect(newTest).to.be.equal(undefined)

  })


})
