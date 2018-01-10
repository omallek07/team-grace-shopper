import React, {Component} from 'react';
import { connect } from 'react-redux';

getCartItemsThunk = () => async (dispatch) => {
  try {
    const cartItems = await fetch('/cart-items')
    dispatch(cartItemsEventCreator{ cartItems })
  }
  catch (error) {
    // what do you do with this error?
    //
  }
}

class Cart extends Component {
  async componentDidMount () {
  }

  render () {
    return (
      <h1>This is the cart page</h1>
    )
  }
}


/* Container */
export default connect(null, null)(Cart);
