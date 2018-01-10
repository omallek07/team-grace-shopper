/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './UserHome'
export {Login, Signup} from './AuthForm'
export {default as Products} from './Products.js';
export {default as SingleGenre} from './SingleGenre.js';
export {default as SingleProduct} from './SingleProduct.js';
export {default as Cart} from './cart';
