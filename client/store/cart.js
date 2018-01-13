import axios from 'axios'

const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_ITEM = 'DELETE_ITEM'

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

const deleteItem = (bookId) => {
  return {
    type: DELETE_ITEM,
    bookId
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
    .then(() => {
      return axios.get('/api/orders/cart')
        .then(res => res.data)
        .then(cart => dispatch(setCart(cart)))
        .catch(err => console.log(err))
    })
}

export const deleteItemThunk = (bookId) => dispatch => {
  return axios.delete(`/api/orders/cart/${bookId}`)
    .then(() => dispatch(deleteItem(bookId)))
    .catch(err => console.error(err))
}


export default function (cart = [], action) {

  switch (action.type) {
    case SET_CART:
      return action.cart;
    case DELETE_ITEM:
      return cart.filter((item) => item.bookId !== action.bookId)
    default:
      return cart;
  }
}
