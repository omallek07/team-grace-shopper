import axios from 'axios'

const GET_BOOK_REVIEW = 'GET_BOOK_REVIEW'
// const POST_REVIEW = 'POST_REVIEW'

const getBookReview = (review) => {
  return {
    type: GET_BOOK_REVIEW,
    review
  }
}

export const getBookReviewThunk = (id) => dispatch => {
  return axios
    .get(`/api/books/${id}/reviews`)
    .then(res => res.data)
    .then(bookReview => dispatch(getBookReview(bookReview)))
    .catch(err => console.log(err));
}

export const postReviewThunk = body => dispatch => {
  return axios.put('/api/reviews', body)
  .then(res => res.data)
  .then(() => axios.get(`/api/books/${body.bookId}/reviews`))
  .then(res => res.data)
  .then(bookReview => dispatch(getBookReview(bookReview)))
  .catch(console.log)
}


export default function(singleBookReviews = [], action) {
    switch (action.type) {
      case GET_BOOK_REVIEW:
        return action.review
      default:
        return singleBookReviews;
    }
  }

