import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Grid } from 'semantic-ui-react';
import {logout, getCart} from '../store'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import history from '../history'
// test//

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  // console.log('props',props)
  const {children, handleClick, isLoggedIn, isAdmin} = props

  return (
    <div>
      <Navbar logstatus={isLoggedIn} handleClick={handleClick} isAdmin={isAdmin} />
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Sidebar logstatus={isLoggedIn} isAdmin={isAdmin} />
        </Grid.Column>
        <Grid.Column width={11}>
          {children}
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = ({user}) => {
  return {
    isLoggedIn: !!user.id,
    isAdmin: !!user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
      .then(() => {
        dispatch( getCart())
        history.push('/home')
      })
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
