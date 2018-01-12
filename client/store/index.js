import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user';
import books from './products';
import singleBook from './singleBook'
import singleBookReviews from './singleBookReviews'
import cart from './cart'
import adminAllOrders from './adminAllOrders';
import adminAllUsers from './adminAllUsers';


const reducer = combineReducers({
  user,
  books,
  singleBook,
  singleBookReviews,
  cart,
  adminAllOrders,
  adminAllUsers
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleBook'
export * from './singleBookReviews'
export * from './cart'

