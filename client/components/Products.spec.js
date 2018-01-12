
/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products Component', () => {

  let products

  beforeEach(() => {
    products = shallow(<Products books ={[]} getBooks={() => {}} />)
  })

  it('Header displays `All Books`', () => {
    expect(products.find('Header').props().children).to.be.equal(' All Books ')
  })

  it('Products component contains 4 items per row', () => {
    expect(products.childAt(1).props().itemsPerRow).to.be.equal(4)
  })

})
