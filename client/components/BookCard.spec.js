import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BookCard} from './BookCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('BookCard Component', () => {
 let bookCard

 const bookExample = {
  id: 1,
  authors: ['Bruce'],
  photoUrl: '',
  title: "The Life and Times of Bruce Campbell",
  description: 'to serve and protect Bruce Campbell'
 }

 beforeEach(() => {
   bookCard = shallow(<BookCard user={{}} cart={{}} book ={bookExample} updateItem={() => {}} />)
 })

 it('finds a book title from the children of Card', () => {
  expect(bookCard.find('CardHeader').props().children).to.be.equal('The Life and Times of Bruce Campbell')
 })

 it('Should render a rating icon', () => {
  expect(bookCard.find('Icon')).to.have.length(1);
 })
})
