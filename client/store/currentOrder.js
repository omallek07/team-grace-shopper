import axios from 'axios';

const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS'
const ADD_ERROR = 'ADD_ERROR'

export const setOrderAddressAction = ( currentOrder ) => {
  return {
    type: SET_ORDER_ADDRESS,
    currentOrder
  }
}

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    error
  }
}
export const changeOrderAddressThunk = (name, address) => dispatch => {
  return axios.post('/api/address', address)
    .then(res => res.data)
    .then(newAddress => dispatch(setOrderAddressAction({name, address: newAddress})))
}

export default function (currentOrder = {}, action){
  switch (action.type) {
    case SET_ORDER_ADDRESS:
      return action.currentOrder
    case ADD_ERROR:
      return {...currentOrder, error: action.error}
    default:
      return currentOrder;
  }
}
