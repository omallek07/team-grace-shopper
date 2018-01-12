import axios from 'axios'

const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
  }
}

export const getCart = () => dispatch => {
  return axios
    .get('/api/orders/cart')
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(err => console.log(err));
}

export const updateItem = (lineItem) => dispatch => {
  return axios.put('/api/orders/cart', lineItem)
    .then(lineItem => {
      return axios.get('/api/orders/cart')
        .then(res => res.data)
        .then(cart => dispatch(setCart(cart)))
        .catch(err => console.log(err))
    })
}


export default function (cart = {}, action) {

  switch (action.type) {
    case SET_CART:
      return action.cart;

    default:
      return cart;
  }
}
