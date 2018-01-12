import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BookCard from './BookCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('BookCard Component', () => {
 let bookCard

 beforeEach(() => {
   bookCard = shallow(<BookCard book ={{authors: [], title: "The Life and Times of Bruce Campbell", publisher: 'Bruce Campbell', purpose: 'to serve and protect Bruce Campbell'}} />)
 })

 it('finds a book title from the children of Card', () => {
   console.log('HERE   ',bookCard.find('CardHeader'))
  //  console.log(bookCard.find('Header').props())
  // console.log('HERE   ',bookCard.find('Card').props().children[1])
   expect(bookCard.find('CardHeader').props().children).to.be.equal('The Life and Times of Bruce Campbell')
  //  expect(bookCard.find('CardHeader').prop('children')).to.be.equal('AfewGoodMen')
   // line 22 and 23 are functionally identical
 })

})
