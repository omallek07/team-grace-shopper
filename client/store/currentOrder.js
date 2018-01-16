import axios from 'axios';

const SET_ORDER_ADDRESS = 'SET_ORDER_ADDRESS'
const ADD_ERROR = 'ADD_ERROR'
const SET_ORDER_ADDRESS_EMPTY = 'SET_ORDER_ADDRESS_EMPTY'

export const setOrderAddressAction = ( currentOrder ) => {
  return {
    type: SET_ORDER_ADDRESS,
    currentOrder
  }
}
export const setOrderAddressEmptyAction = () => {
  return {
    type: SET_ORDER_ADDRESS_EMPTY
  }
}

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    error
  }
}

export const changeOrderAddressThunk = (name, email, address) => dispatch => {
  return axios.post('/api/address', address)
    .then(res => res.data)
    .then(newAddress => dispatch(setOrderAddressAction({name, email, address: newAddress})))
}

export default function (currentOrder = {}, action){
  switch (action.type) {
    case SET_ORDER_ADDRESS:
      return action.currentOrder
    case ADD_ERROR:
      return {...currentOrder, error: action.error}
    case SET_ORDER_ADDRESS_EMPTY:
      return {}
    default:
      return currentOrder;
  }
}
