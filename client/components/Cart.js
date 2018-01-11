import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  render () {
    return (
      <h1>{this.props.isLoggedIn.toString()}  This is the cart page</h1>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user
  }
}

const mapDispatch = state => {

}

//
//
/* Container */
export default connect(mapState)(Cart);
