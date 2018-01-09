const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address model', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('properties', () => {
    let ourAddress

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
      })
    })

    it('has streetOne, which is required', () => {
      expect(ourAddress.streetOne).to.be.equal('69 Boner Avenue')

    })

    it('has streetTwo, which is NOT required', () => {
      expect(ourAddress.streetTwo).to.be.equal('apt 69')
      ourAddress.update({streetTwo: null})
      .then(address => {
        expect(address.streetTwo).to.be.equal(null)
      })
    })

    it('has city', () => {
      expect(ourAddress.city).to.be.equal('Chicago')
    })

    it('has state', () => {
      expect(ourAddress.state).to.be.equal('IL')
    })

    it('has zip', () => {
      expect(ourAddress.zip).to.be.equal(60657)
    })

  })

})
