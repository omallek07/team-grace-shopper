import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Rating, Button, Form, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class ReviewInput extends Component {

  constructor(props) {
    super()
    this.state = {
      comment: '',
      valid: false
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e, { value }) {
    this.setState({ comment: value })
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <Form>
          <label For="rating">Your Rating: </label>
          <Rating icon="star"
            defaultRating={0}
            maxRating={5}
            name="rating"
          />
          <Form.Field control={TextArea} label="Write a review:" placeholder="Write a review..." onChange={this.handleOnChange} width={16} name="comment"/>
          <Form.Field control={Button} disabled={this.state.comment.length < 3 || this.state.comment.length > 600} type="submit">Submit</Form.Field>
          ({this.state.comment.length}/600)
        </Form >
      )
    } else {
      return (
        <div>
          <Link to="/login">
            <Button primary>
              Log In To Write A Review
            </Button>
          </Link>
        </div>
      )
    }
  }

}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(ReviewInput)
