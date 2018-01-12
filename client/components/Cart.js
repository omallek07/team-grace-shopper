import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  
  render () {
    const isLoggedIn = this.props.isLoggedIn;
    console.log('this   ', this.props.user)
    return (
      <h1>{this.props.isLoggedIn.toString()}  This is the cart page</h1>
    )
  }
}

const mapState = ({user}) => {
  return {
    isLoggedIn: !!Object.keys(user).length,     // Kanter wrote this --> isLoggedIn: !!user,
    user: user
  }
}

const mapDispatch = state => {

}

//
//
/* Container */
export default connect(mapState)(Cart);
