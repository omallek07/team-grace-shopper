/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {OrderFilterType} from './OrderFilterType'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Order filter type Component', () => {
  let wrapper
  const book = [
    {
      id: 1,
      status: 'processing',
      purchaseTime: '2018-01-15 12:28:07.531-06',
      user: {
        name: 'John Doe'
      },
      address: {
        streetOne: '1430 Drive St',
        streetTwo: 'Apt 3F',
        city: 'Chicago',
        zip: '34343',
        state: 'IL'
      },
      lineItems: [{
        id: 1,
        photoUrl: 'http://example.com',
        orderQuantity: 2,
        orderPrice: 1400,
        book: {
          id: 1,
          photoUrl: 'www.example.com'
        }
      }]
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<OrderFilterType type={ book } updateOrderStatusThunk={() => {}} />)
  })

  it('Should have a table body', () => {
    expect(wrapper.find('TableBody')).to.be.length(1)
  })

  it('Should have 8 Table Cells', () => {
    expect(wrapper.find('TableCell')).to.be.length(8)
  })

  it('Should display name correctly inside table cell', () => {
    expect(wrapper.find('TableCell').at(3).children()
    .contains('John Doe')).to.equal(true);
  })

  it('Table should display streetTwo address if provided', () => {
    expect(wrapper.find('TableCell').at(4).children()
    .contains('1430 Drive St Apt 3F, Chicago, IL, 34343')).to.equal(true);
  })
})
