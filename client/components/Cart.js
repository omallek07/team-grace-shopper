import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid, Item, Label, Icon, Button} from 'semantic-ui-react'
import {updateItem, deleteItemThunk, setOrderAddressAction, placeUserOrderThunk} from '../store'
import {withRouter} from 'react-router-dom'
import history from '../history'
function Cart (props){
  const isLoggedIn = props.isLoggedIn;
  const cart = props.cart;
  return (
    cart ?
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={12}>
          <h2>Shopping Cart </h2>
        </Grid.Column>
        <Grid.Column width={2}>
          <h2>Price</h2>
        </Grid.Column>
        <Grid.Column width={2}>
          <h2>Quantity</h2>
        </Grid.Column>
      </Grid.Row>
      {cart.map(lineItem => {
        return (
          <Grid.Row key={lineItem.id}>
            <Grid.Column width={4}>
              <Item.Image size='medium'  src={lineItem.book.photoUrl} />
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>{lineItem.book.title}</h3>
              <h5>
                {
                  lineItem.book.authors.map(author =>
                    <div key={author.id}>
                    {author.firstName + ' ' + author.lastName}
                    </div>
                  )}
              </h5>
              <Label >
                Delete
                <Icon name='delete' onClick = {() => props.deleteItem(lineItem.bookId, props.user.id)}/>
              </Label>
            </Grid.Column>
            <Grid.Column width={2}>
              <Label color = 'orange'>${lineItem.book.currentPrice/100}</Label>
            </Grid.Column>
            <Grid.Column width={2}>
              <select value={lineItem.orderQuantity} onChange = {(e)=>{props.changeCart(lineItem.book.id,e.target.value,props.user.id)}}>
                {  Array.from({length: lineItem.book.stockQuantity}, (x,i)=>i+1).map(num=>{
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
        <Grid.Column width = {12}></Grid.Column>
        <Grid.Column width = {4}>
          <Label color ='red'>
            SubTotal (
            {
              cart && cart.map(x => x.orderQuantity).reduce((a,b) => a+b,0)
            } items ) : $
            {
              cart && cart.map(x => {
                return (
                  x.orderQuantity * (x.book.currentPrice/100)
                )
              }).reduce((a,b) => a+b,0)
            }
          </Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}></Grid.Column>
        <Grid.Column width={4}>
        { props.location &&
          (props.location.pathname.includes('confirm')) ?
            <Button color='green' onClick = {()=> props.placeOrder(props.cart, props.user, props.currentOrder)}>
              Place Order
            </Button>
            :
            <Button onClick = {() => {
              if (props.user.address){
                props.setOrderAddress(props.user.name,props.user.address)
              }
              props.history.push('/cart/confirm')}
            }>
              Proceed to Checkout
            </Button>
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
    :
    <div>Empty Cart</div>
  )
}


const mapState = ({user, cart, currentOrder}) => {
  return {
    isLoggedIn: !!Object.keys(user).length,     // Kanter wrote this --> isLoggedIn: !!user,
    user: user,
    cart: cart,
    currentOrder: currentOrder
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    changeCart(bookId, orderQuantity, userId){
      dispatch(updateItem({bookId, orderQuantity, userId}))
    },
    deleteItem(bookId,userId){
      dispatch(deleteItemThunk({bookId, userId}))
    },
    setOrderAddress(name,address){
      dispatch(setOrderAddressAction({name,address}))
    },
    placeOrder(cart,user,currentOrder){
      console.log('current cart is',cart)
      console.log('user is',user)
      console.log('currentOrder is',currentOrder)
      dispatch(placeUserOrderThunk())
      history.push('/home')
    }
  }
}

export default withRouter(connect(mapState,mapDispatch)(Cart));
