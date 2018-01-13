import axios from 'axios'

/**
 * ACTION TYPES
 */
const INDIVIDUAL_USER_REVIEWS = 'INDIVIDUAL_USER_REVIEWS'


/**
 * ACTION CREATORS
 */
const individualUserReviews = (reviews) => {
  return {
    type: INDIVIDUAL_USER_REVIEWS,
    reviews
  }
}

/**
 * THUNK CREATORS
 */
export const individualUserReviewsThunk = (userId) => dispatch => {
  return axios
    .get(`/api/reviews/${userId}`)
    .then(res => res.data)
    .then(reviews => dispatch(individualUserReviews(reviews)))
    .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(reviews = [], action) {

  switch (action.type) {
    case INDIVIDUAL_USER_REVIEWS:
      return action.reviews;

    default:
      return reviews;
  }
}
