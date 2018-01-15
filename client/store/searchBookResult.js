import axios from 'axios';


const FIND_BOOKS_BY_TITLE = 'GET_BOOKS_BY_TITLE';


const findBookByTitle = (result) => ({
  type: FIND_BOOKS_BY_TITLE, result
})


export const findBookByTitleThunk = (query) => dispatch => {
  axios.get(`/api/books/title/:${query}`)
  .then(res => res.data)
  .then(result => dispatch(findBookByTitle(result)))
  .catch(err => console.log(err));
}

export default function(result = [], action) {
  switch (action.type) {
    case FIND_BOOKS_BY_TITLE:
      return action.result;
    default:
      return result;
  }
}
