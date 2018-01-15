import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_USERS = 'ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER_ADMIN_STATUS = 'UPDATE_USER_ADMIN_STATUS'

/**
 * ACTION CREATORS
 */
const allUsers = (users) => ({type: ALL_USERS, users})
const deleteUser = (userId) => ({type: DELETE_USER, userId})
const updateUserAdminStatus = (updatedUser) => ({type: UPDATE_USER_ADMIN_STATUS, updatedUser})

/**
 * THUNK CREATORS
 */
export const allUsersThunk = () => dispatch => {
  axios.get('/api/admin/users')
  .then(res => res.data)
  .then(users => dispatch(allUsers(users)))
  .catch(err => console.log(err));
}

export const deleteUserThunk = (userId) => dispatch => {
  axios.delete(`/api/admin/users/${userId}`)
  .then(() => {
    return dispatch(deleteUser(userId))})
  .catch(err => console.log(err))
}

export const updateUserAdminStatusThunk = (userId, status) => dispatch => {
  axios.put(`/api/admin/users/${userId}`, {status: status})
  .then(res => res.data)
  .then(updatedUser => dispatch(updateUserAdminStatus(updatedUser)))
  .catch(err => console.log(err));
}

/**
 * REDUCER
 */
export default function(users = [], action) {

  switch (action.type) {
    case ALL_USERS:
      return action.users;
    case UPDATE_USER_ADMIN_STATUS:
      return users.map(user => (
        action.updatedUser.id === user.id ? action.updatedUser : user
      ))
    case DELETE_USER:
      return users.filter(user => user.id !== action.userId)
    default:
      return users;
  }
}
