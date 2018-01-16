import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth,getCart} from '../store'
import history from '../history'
import { Segment, Form, Button, Container, Header, Grid } from 'semantic-ui-react';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column>
        <Header color="red" textAlign="center">
        Please {displayName}
        </Header>
        <Form onSubmit={handleSubmit} name={name} size="large">
          <Container>
            <Form.Input
              htmlFor="email"
              name="email"
              icon="user"
              placeholder="Please enter your email"
              iconPosition="left"
              />
          </Container>
          <Container>
            <Form.Input
              htmlFor="password"
              name="password"
              placeholder="Please enter your password"
              icon="lock"
              iconPosition="left"
              type="password"
              />
          </Container>
          <Container>
            <Button type="submit">{displayName}</Button>
          </Container>
            {error && error.response && <div> {error.response.data} </div>}
          <Container>
            <a href="/auth/google">{displayName} with Google</a>
          </Container>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const method = 'login'
      const firstName = "John"
      const lastName = "Doe"
      dispatch(auth({email, password, firstName, lastName, method, formName}))
      .then((user) => {
        dispatch(getCart(user.user.id))
        history.push('/home')
      })
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
