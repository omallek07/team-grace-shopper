import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { ConfirmOrderInfo, Main, Login, Signup, UserHome, Products, SingleProduct, SingleGenre, Cart, UserReviews, UserOrders, UserAccountDashboard, AdminDashboard, OrderConfirmation } from './components'
import { me, getCart, getAllBooksThunk, getGenresThunk } from './store'


/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={UserHome} />
            <Route path="/home" component={UserHome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/cart/orderStatus" component={ConfirmOrderInfo} />
            <Route exact path="/cart/confirm" component={OrderConfirmation} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            <Route path="/products/genre/:genreId" component={SingleGenre} />
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                <Route path="/userReviews" component={UserReviews} />
                <Route path="/userOrders" component={UserOrders} />
                <Route path="/userAccountDash" component={UserAccountDashboard} />
                {
                  isAdmin &&
                  <Route path="/adminDash" component={AdminDashboard} />
                }
              </Switch>
            }
            {/* Displays our Home component as a fallback */}
            <Route component={UserHome} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({ user }) => {
  return {
    isLoggedIn: !!user.id,
    isAdmin: !!user.isAdmin,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me()).then((x) => {
        dispatch(getCart(x.user.id))
        dispatch(getGenresThunk())
      })
    }
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData () {
//       dispatch(me())
//     },
//     getAllBooks: () => dispatch(getAllBooks())
//   }
// }

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  // loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
