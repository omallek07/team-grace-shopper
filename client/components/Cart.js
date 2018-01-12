import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid,Item} from 'semantic-ui-react'

function Cart (props){
  const isLoggedIn = props.isLoggedIn;
  const cart = props.cart;
  return (
    cart.lineItems ?
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={12}>
          Shopping Cart
        </Grid.Column>
        <Grid.Column width={2}>
          Price
        </Grid.Column>
        <Grid.Column width={2}>
          Quantity
        </Grid.Column>
      </Grid.Row>
      {cart.lineItems.map(lineItem => {
        return(
          <Grid.Row key={lineItem.id}>
            <Grid.Column width={4}>
              <Item.Image size='medium'  src={lineItem.book.photoUrl} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>{lineItem.book.title}</div>
              <div>{lineItem.book.authors.map(author=>author.firstName+author.lastName)}</div>
              <div>Delete</div>
            </Grid.Column>
            <Grid.Column width={2}>
              <div>${lineItem.book.currentPrice/100}</div>
            </Grid.Column>
            <Grid.Column width={2}>
              <select value={lineItem.orderQuantity} >
                {  [1,2,3,4,5,6,7,8,9,10].map(num=>{
                  return (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  )
                })
              }
              </select>
            </Grid.Column>
          </Grid.Row>
        )
      })}
      <Grid.Row>
        <Grid.Column>
          <div>SubTotal({} item)</div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    :
    <div>Empty Cart</div>
  )
}


const mapState = ({user, cart}) => {
  return {
    isLoggedIn: !!Object.keys(user).length,     // Kanter wrote this --> isLoggedIn: !!user,
    user: user,
    cart: cart
  }
}

export default connect(mapState)(Cart);
