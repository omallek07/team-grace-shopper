import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Grid } from 'semantic-ui-react';
import {logout} from '../store'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// test//

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  // console.log('props',props)
  const {children, handleClick, isLoggedIn} = props

  return (
    <div>
      <Navbar logstatus={isLoggedIn} handleClick={handleClick} />
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Sidebar logstatus={isLoggedIn} />
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
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
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
