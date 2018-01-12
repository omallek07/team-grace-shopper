import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_USERS = 'ALL_USERS'


/**
 * ACTION CREATORS
 */
const allUsers = (users) => {
  return {
    type: ALL_USERS,
    users
  }
}

/**
 * THUNK CREATORS
 */
export const allUsersThunk = () => dispatch => {
  return axios
    .get('/api/users/adminAllUsers')
    .then(res => {
      console.log('res', res.data)
      return res.data })
    .then(users => dispatch(allUsers(users)))
    .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(users = [], action) {

  switch (action.type) {
    case ALL_USERS:
      return action.users;

    default:
      return users;
  }
}
