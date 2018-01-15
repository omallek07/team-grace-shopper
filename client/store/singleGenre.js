import axios from 'axios';

const GET_GENRE_BY_ID = 'GET_GENRE_BY_ID';


const getGenreByIdAction = (singleGenre) => {
  return {
    type: GET_GENRE_BY_ID,
    singleGenre
  }
}
             
export const getGenreByIdThunk = (id) => dispatch => {
  return axios
    .get(`/api/genres/${id}`)
    .then(res => res.data)
    .then(singleGenre => dispatch(getGenreByIdAction(singleGenre)))
    .catch(err => console.log(err));
  }

export default function(singleGenre = {}, action) {
    switch (action.type) {
      case GET_GENRE_BY_ID:
        return action.singleGenre
      default:
        return singleGenre;
    }
  }
