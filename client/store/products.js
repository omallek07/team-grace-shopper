import axios from 'axios';

const GET_ALL_BOOKS = 'GET_ALL_BOOKS';

const getBooks = (books) => {
    return {
        type: GET_ALL_BOOKS,
        books
    }
}

export const getAllBooksThunk = () => dispatch => {
  return axios
    .get('/api/books')
    .then(res => res.data)
    .then(books => dispatch(getBooks(books)))
    .catch(err => console.log(err));
}

export default function(books = [], action) {
    switch (action.type) {
      case GET_ALL_BOOKS:
        return action.books;

      default:
        return books;
    }
  }
