import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Rating, Button, Form, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { postReviewThunk, getBookReviewThunk } from '../store/index';

class ReviewInput extends Component {

  constructor(props) {
    super()
    this.state = {
      comment: '',
      valid: false,
      rating: 0,
      editing: false
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.ratingChange = this.ratingChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOnChange(e, { value }) {
    this.setState({ comment: value })
  }

  ratingChange(e, { rating }) {
    this.setState({ rating })
    this.props.postReview({ bookId: this.props.bookId, rating: this.state.rating })
  }

  handleSubmit(e) {
    this.props.postReview({ bookId: this.props.bookId, comment: this.state.comment, rating: this.state.rating })
    this.setState({ editing: false })
  }

  render() {
    if (this.props.isLoggedIn) {
      if (this.props.ourReview && !this.state.editing) {
        return (
          <div>
            <div>
              <strong>
                Your Review:
              </strong>
            </div>
            <div>
              <Rating
                icon="star"
                defaultRating={this.props.ourReview.rating}
                maxRating={5}
                disabled
              />
            </div>
            <div>
              {this.props.ourReview.comment}
            </div>
            <Button onClick={() => {
              this.setState({ editing: true })
            }}>
              Edit
            </Button>
          </div>
        )
      }
      else {
        return (
          <Form onSubmit={this.handleSubmit}>
            <label htmlFor="rating">Your Rating: </label>
            <Rating icon="star"
              defaultRating={this.props.ourReview ? this.props.ourReview.rating : 0}
              maxRating={5}
              name="rating"
              onRate={this.ratingChange}
            />
            <Form.Field control={TextArea} label="Write a review:" placeholder="Write a review..." onChange={this.handleOnChange} width={16} name="comment" />
            <Form.Field control={Button} disabled={!this.state.rating || this.state.comment.length < 3 || this.state.comment.length > 600} type="submit">Submit</Form.Field>
            ({this.state.comment.length}/600) {!this.state.rating && "(please give the product a rating in order to review)"}
          </Form >
        )
      }
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
    isLoggedIn: !!state.user.id,
    bookId: state.singleBook.id,
    ourReview: state.singleBookReviews.find(review => review.userId === state.user.id)
  }
}

const mapDispatch = dispatch => {
  return {
    postReview: review => {
      dispatch(postReviewThunk(review))
    }
  }
}


export default connect(mapState, mapDispatch)(ReviewInput)
