/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Products} from './Products.jsx';
export {default as SingleGenre} from './SingleGenre.jsx';
export {default as SingleProduct} from './SingleProduct.jsx';
export {default as Cart} from './cart';
