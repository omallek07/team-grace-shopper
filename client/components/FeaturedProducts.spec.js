/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {FeaturedProducts} from './FeaturedProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Featured Products Component', () => {

  let features

  beforeEach(() => {
    features = shallow(<FeaturedProducts books ={[]} getBooks={() => {}} />)
  })

  it('Shows a book authored by Bruce Campbell', () => {
    expect(features.find('Book').props().children).to.be.equal(' All Books ')
  })

  it('FeaturedProducts component contains 4 items per row', () => {
    expect(features.childAt(1).props().itemsPerRow).to.be.equal(4)
  })

})
