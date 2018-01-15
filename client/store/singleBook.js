import axios from 'axios';

const GET_BOOK_BY_ID = 'GET_BOOK_BY_ID';


const getBookByIdAction = (singleBook) => {
  return {
    type: GET_BOOK_BY_ID,
    singleBook
  }
}

export const getBookByIdThunk = (id) => dispatch => {
  return axios
    .get(`/api/books/${id}`)
    .then(res => res.data)
    .then(singleBook => dispatch(getBookByIdAction(singleBook)))
    .catch(err => {
      console.log(err)
      return {}
    });
  }

export default function(singleBook = {}, action) {
    switch (action.type) {
      case GET_BOOK_BY_ID:
        return action.singleBook
      default:
        return singleBook;
    }
  }
