import axios from 'axios'

const GET_GENRES = 'GET_GENRES'

const getGenres = (genres) => ({
  type: GET_GENRES,
  genres
})

export const getGenresThunk = () => dispatch => {
  return axios.get('/api/genres')
  .then(res => res.data)
  .then(genres => dispatch(getGenres(genres)))
  .catch(console.log)
}

export default function(genres = [], action) {

  switch (action.type) {
    case GET_GENRES:
      return action.genres;
    default:
      return genres;
  }
}
