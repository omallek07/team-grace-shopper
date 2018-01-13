const { db } = require('../server/db');
const {
  Author,
  Address,
  Genre,
  LineItems,
  Order,
  Book,
  Review,
  User
} = require('../server/db')


const authors = [
  {
    firstName: 'Chris',
    lastName: 'Minnick'
  },
  {
    firstName: 'Eva',
    lastName: 'Holland'
  },
  {
    firstName: 'Eric',
    lastName: 'Freeman'
  },
  {
    firstName: 'Elisabeth',
    lastName: 'Robson'
  },
  {
    firstName: 'Mark',
    lastName: 'Myers'
  },
  {
    firstName: 'Marijn',
    lastName: 'Haverbeke'
  },
  {
    firstName: 'David',
    lastName: 'Flanagan'
  },
  {
    firstName: 'Bruce',
    lastName: 'Campbell'
  },
  {
    firstName: 'Joseph',
    lastName: 'Heller'
  }
];


const books = [
  {//1,2
    title: 'Coding with JavaScript For Dummies',
    description: 'Coding with JavaScript For Dummies provides easy, hands-on instruction for anyone looking to learn this popular client-side language. No experience? No problem! This friendly guide starts from the very beginning and walks you through the basics, then shows you how to apply what you have learned to real projects. ',
    stockQuantity: 25,
    photoUrl: 'https://i5.walmartimages.com/asr/e45b869b-c78a-4d61-8c67-5cf9a34f0296_1.605eb531d2a99bb5c6cc22339604f246.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    currentPrice: 1599,
    ratingSum: 90,
    numberOfRatings: 20,
  },
  {//3,4
    title: 'Head First JavaScript Programming: A Brain-Friendly Guide',
    description: 'This brain-friendly guide teaches you everything from JavaScript language fundamentals to advanced topics, including objects, functions, and the browser’s document object model. You won’t just be reading—you’ll be playing games, solving puzzles, pondering mysteries, and interacting with JavaScript in ways you never imagined. And you’ll write real code, lots of it, so you can start building your own web applications.',
    stockQuantity: 25,
    photoUrl: 'https://covers.oreillystatic.com/images/0636920027065/lrg.jpg',
    currentPrice: 3299,
    ratingSum: 95,
    numberOfRatings: 20,
  },
  {//5
    title: 'A Smarter Way to Learn JavaScript',
    description: 'I wrote the book and exercises especially for people who are new to programming. Making no assumptions about what you already know, I walk you through JavaScript slowly, patiently. I explain every little thing in sixth-grade English.',
    stockQuantity: 20,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/512KPmZIG7L.jpg',
    currentPrice: 1078,
    ratingSum: 75,
    numberOfRatings: 18,
  },
  {//6
    title: 'Eloquent JavaScript',
    description: 'Eloquent JavaScript, 2nd Edition dives deep into the JavaScript language to show you how to write beautiful, effective code. Author Marijn Haverbeke immerses you in example code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs.',
    stockQuantity: 35,
    photoUrl: 'http://eloquentjavascript.net/img/cover.png',
    currentPrice: 3196,
    ratingSum: 125,
    numberOfRatings: 30,
  },
  {//7
    title: `JavaScript: The Definitive Guide`,
    description: `Since 1996, JavaScript: The Definitive Guide has been the bible for JavaScript programmers—a programmer's guide and comprehensive reference to the core language and to the client-side JavaScript APIs defined by web browsers.`,
    stockQuantity: 40,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX258_BO1,204,203,200_.jpg',
    currentPrice: 2476,
    ratingSum: 25,
    numberOfRatings: 8,
  },
  {//8
    title: 'If Chins Could Kill: Confessions of a B Movie Actor',
    description: `This book is so funny, I'm going to have it tattooed on my back!" - Barack Obama`,
    stockQuantity: 355,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gp-KdBvWL.jpg',
    currentPrice: 2195,
    ratingSum: 1696,
    numberOfRatings: 377,
  },
  {//8
    title: 'Make Love! The Bruce Campbell Way',
    description: `One of the most delightfully deranged experiences you'll have reading this year. Hail to the king, baby.`,
    stockQuantity: 50,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51zghlLBYgL._SX329_BO1,204,203,200_.jpg',
    currentPrice: 1535,
    ratingSum: 650,
    numberOfRatings: 139,
  },
  {
    title: `Catch-22`,
    description: `"Hilarious.  And the only decent thing Heller ever wrote." - Gandhi`,
    stockQuantity: 8,
    currentPrice: 8,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/61k33tU1CaL.jpg",
    ratingSum: 0,
    numberOfRatings: 1,
    averageRating: 1
  },
  {
    title: `Hail to the Chin: Further Confessions of a B Movie Actor`,
    description: `“An insightful and rant-filled guide to being almost famous.” ― Jesus`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/51TCRF%2BKPYL._SX327_BO1,204,203,200_.jpg",
    ratingSum: 0,
    numberOfRatings: 1,
    averageRating: 5
  }
];
const bookAuthors = [
  {
    bookId: 1,
    authorId: 1
  },
  {
    bookId: 1,
    authorId: 2
  },
  {
    bookId: 2,
    authorId: 3
  },
  {
    bookId: 2,
    authorId: 4
  },
  {
    bookId: 3,
    authorId: 5
  },
  {
    bookId: 4,
    authorId: 6
  },
  {
    bookId: 5,
    authorId: 7
  },
  {
    bookId: 6,
    authorId: 8
  },
  {
    bookId: 7,
    authorId: 8
  },
  {
    bookId: 8,
    authorId: 7
  },
  { 
    bookId: 9,
    authorId: 8
  }
]

const categories = [
  {
    bookId: 1,
    genreId: 1
  },
  {
    bookId: 1,
    genreId: 2
  },
  {
    bookId: 2,
    genreId: 3
  },
  {
    bookId: 2,
    genreId: 4
  },
  {
    bookId: 3,
    genreId: 5
  },
  {
    bookId: 4,
    genreId: 6
  },
  {
    bookId: 5,
    genreId: 7
  },
  {
    bookId: 6,
    genreId: 8
  },
  {
    bookId: 7,
    genreId: 8
  }
]

const addresses = [
  {
    streetOne: '222 W merchandise mart plaza',
    streetTwo: '#1212',
    city: 'chicago',
    state: 'IL',
    zip: '60654'
  },
  {
    streetOne: '420 E Ohio St',
    streetTwo: 'apt 22D',
    city: 'chicago',
    state: 'IL',
    zip: '60611'
  },
  {
    streetOne: '123 6th St.',
    city: 'Melbourne',
    state: 'FL',
    zip: '32904'
  },
  {
    streetOne: '71 Pilgrim Avenue',
    city: 'Chevy Chase',
    state: 'MD',
    zip: '20815'
  },
  {
    streetOne: '70 Bowman St.',
    city: 'South Windsor',
    state: 'CT',
    zip: '06074'
  }
]

const users = [
  {
    email: 'grubbycoder@gmail.com',
    password: 'hello',
    firstName: 'Erda',
    lastName: 'Wadleigh',
    isAdmin: false,
    addressId: 1
  },
  {
    email: 'rutvikhp@gmail.com',
    password: 'rutu8534',
    firstName: 'Rutvik',
    lastName: 'Patel',
    isAdmin: true,
    addressId: 2
  },
  {
    email: 'cageycoder@gmail.com',
    password: 'hellothere',
    firstName: 'Tiler',
    lastName: 'Thurston',
    isAdmin: false,
    addressId: 3
  },
  {
    email: 'aspiring@gmail.com',
    password: 'abcd',
    firstName: 'Leandra',
    lastName: 'Franconi',
    isAdmin: false,
    addressId: 4
  },
  {
    email: 'ugly@gmail.com',
    password: 'wxyz',
    firstName: 'Etan',
    lastName: 'Saville',
    isAdmin: false,
    addressId: 5
  },
]

const reviews = [
  {
    comment: 'If information is what you want, this book has it. Be forewarned that before starting this book, one should learn the basics of computer programming. There are great free and non-free resources online (I used lynda.com).',
    rating: 5,
    userId: 2,
    bookId: 5
  },
  {
    comment: `Bruce, you da man! Totally enjoyed the editor's writing style that hilariously brings to life your fun, fun story!!! Just kidding! I know you really wrote it (wink, wink). Regardless of who or what wrote it, your book rocks. Every make-love page resonated with a fellow baby-boomer: Looking forward to the audio version turned up real loud (wink, wink).`,
    rating: 5,
    userId: 4,
    bookId: 7
  },
  {
    comment: `Overall, a pretty good intro to JavaScript. I thought they covered the material well and explained things in a way that was easy to understand. I'm not a fan of the tone the book is written in personally. It's goofy to an obnoxious level at times, but that's just my personal taste.`,
    rating: 4,
    userId: 1,
    bookId: 2
  }
]
const orders = [
  {
    status: 'cart',
    userId: 1,
    addressId: 1
  },
  {
    status: 'processing',
    purchaseTime: Date.now(),
    userId: 2,
    addressId: 2
  },
  {
    status: 'cancelled',
    userId: 3,
    addressId: 3
  },
  {
    status: 'cart',
    userId: 4,
    addressId: 4
  },
  {
    status: 'completed',
    purchaseTime: Date.now(),
    userId: 4,
    addressId: 4
  },
]
const lineItems = [
  {
    orderQuantity: 2,
    orderPrice: 1599,
    orderId: 1,
    bookId: 1
  },
  {
    orderQuantity: 1,
    orderPrice: 3299,
    orderId: 1,
    bookId: 2
  },
  {
    orderQuantity: 1,
    orderPrice: 1078,
    orderId: 2,
    bookId: 3
  },
  {
    orderQuantity: 3,
    orderPrice: 1078,
    orderId: 4,
    bookId: 3
  },
  {
    orderQuantity: 1,
    orderPrice: 2476,
    orderId: 5,
    bookId: 5
  },
  {
    orderQuantity: 1,
    orderPrice: 3196,
    orderId: 5,
    bookId: 4
  },
]

const genres = [
  {
    name: 'science fiction'
  },
  {
    name: 'telepathy'
  },
  {
    name: 'non-fiction'
  },
  {
    name: 'parapsychology'
  },
  {
    name: 'self-improvement'
  },
  {
    name: 'defensive witchcraft'
  },
  {
    name: 'hexes / spells / curses'
  },
  {
    name: '2016 election grief counseling'
  }
]

const seed = async () => {
  const authorArray = await Promise.all(authors.map(author => Author.create(author)))
  const addressArray = await Promise.all(addresses.map(address => Address.create(address)))
  const genreArray = await Promise.all(genres.map(genre => Genre.create(genre)))
  const bookArray = await Promise.all(books.map(book => Book.create(book)))
  const userArray = await Promise.all(users.map(user => User.create(user)))
  const reviewArray = await Promise.all(reviews.map(review => Review.create(review)))
  const orderArray = await Promise.all(orders.map(order => Order.create(order)))
  const lineItemArray = await Promise.all(lineItems.map(lineItem => LineItems.create(lineItem)))
  const bookAuthorArray = await Promise.all(bookAuthors.map(bookAuthor => db.models.bookAuthors.create(bookAuthor)));
  const categoriesArray = await Promise.all(categories.map(category => db.models.categories.create(category)));
}

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(async () => {
      console.log('Seeding databse...');
      return await seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
