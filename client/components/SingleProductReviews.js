import React from 'react';
import {connect} from 'react-redux'
import {Rating} from 'semantic-ui-react'
import PropTypes from 'prop-types'

function SingleProductReviews (props){

    const reviews = props.singleBookReviews
    return (
      <div>
        {
          reviews.map((bookReview) => {
            return (
              <div key = {bookReview.id}>
                <div>
                  <strong>
                    {bookReview.user.name}
                  </strong>
                </div>
                <div>
                  <Rating
                    icon = "star"
                    defaultRating={bookReview.rating}
                    maxRating={5}
                    disabled
                  />
                </div>
                <div>
                  {bookReview.comment}
                </div>
              </div>
            )
          })}
        </div>
      )
  }

const mapStateToProps = (state) => {
  return {
    singleBookReviews: state.singleBookReviews,
  }
}

export default connect(mapStateToProps)(SingleProductReviews);

SingleProductReviews.propTypes = {
  singleBookReviews: PropTypes.array.isRequired
}
