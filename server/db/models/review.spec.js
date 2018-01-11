const {db} = require('../index')
const {expect} = require('chai')

const Rating = db.model('review')
// const Rating = require('./rating')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync()
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return Rating.create({rating:1})
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.comment).to.be.equal(null)
      })

      // it('returns false if the password is incorrect', () => {
      //   expect(cody.correctPassword('bonez')).to.be.equal(false)
      // })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
