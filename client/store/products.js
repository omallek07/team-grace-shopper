import axios from 'axios';

const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const CREATE_NEW_BOOK = 'CREATE_NEW_BOOK';


const getBooks = books => ({type: GET_ALL_BOOKS, books})
const deleteBook = id => ({type: DELETE_BOOK, id})
const updateBook = updatedBook => ({type: UPDATE_BOOK, updatedBook})
const createNewBook = newBook => ({type: CREATE_NEW_BOOK, newBook})


export const getAllBooksThunk = () => dispatch => {
  return axios
    .get('/api/books')
    .then(res => res.data)
    .then(books => dispatch(getBooks(books)))
    .catch(err => console.log(err));
}

export const createNewBookDispatcher = (newBookDetails, bookAuthor, bookGenre) => dispatch => {
  const newBookData = [bookAuthor, bookGenre, newBookDetails]

  axios.post('/api/admin/books', newBookData)
  .then(res => {
    return dispatch(createNewBook(res.data))
  })
  .catch(err => console.error(`Creating book: ${newBookDetails} unsuccesful`, err))
};

export const deleteBookDispatcher = id => dispatch => {
  dispatch(deleteBook(id));
  axios.delete(`/api/books/${id}`)
  .catch(err => console.error(`Removing book: ${id} unsuccesful`, err));
};

export const updateBookInfoDispatcher = (id, info) => dispatch => {
  axios.put(`/api/books/${id}`, info)
  .then(res => dispatch(updateBook(res.data)))
  .catch(err => console.error(`Updating book: ${info} unsuccesful`, err));
};

export default function(books = [], action) {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return action.books;
    case CREATE_NEW_BOOK:
      return [action.newBook, ...books];
    case UPDATE_BOOK:
      return books.map(book => (
        action.updatedBook.id === book.id ? action.updatedBook : book
      ));
    case DELETE_BOOK:
      return books.filter(book => book.id !== action.id);
    default:
      return books;
  }
}
