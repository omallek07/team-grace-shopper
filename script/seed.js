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
  { //1
    firstName: 'Chris',
    lastName: 'Minnick'
  },
  { //2
    firstName: 'Eva',
    lastName: 'Holland'
  },
  { //3
    firstName: 'Eric',
    lastName: 'Freeman'
  },
  { //4
    firstName: 'Elisabeth',
    lastName: 'Robson'
  },
  { //5
    firstName: 'Mark',
    lastName: 'Myers'
  },
  { //6
    firstName: 'Marijn',
    lastName: 'Haverbeke'
  },
  { //7
    firstName: 'David',
    lastName: 'Flanagan'
  },
  { //8
    firstName: 'Bruce',
    lastName: 'Campbell'
  },
  { //9
    firstName: 'Joseph',
    lastName: 'Heller'
  },
  { //10
    firstName: 'Joseph',
    lastName: 'Conrad'
  },
  { //11
    firstName: 'Shel',
    lastName: 'Silverstein'
  },
  { //12
    firstName: 'JD',
    lastName: 'Salinger'
  },
  { //13
    firstName: 'Viktor',
    lastName: 'Frankl'
  }
];


const books = [
  {//1
    title: 'Coding with JavaScript For Dummies',
    description: 'Coding with JavaScript For Dummies provides easy, hands-on instruction for anyone looking to learn this popular client-side language. No experience? No problem! This friendly guide starts from the very beginning and walks you through the basics, then shows you how to apply what you have learned to real projects. ',
    stockQuantity: 25,
    photoUrl: 'https://i5.walmartimages.com/asr/e45b869b-c78a-4d61-8c67-5cf9a34f0296_1.605eb531d2a99bb5c6cc22339604f246.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    currentPrice: 1599,
    ratingSum: 90,
    numberOfRatings: 20,
  },
  {//2
    title: 'Head First JavaScript Programming: A Brain-Friendly Guide',
    description: 'This brain-friendly guide teaches you everything from JavaScript language fundamentals to advanced topics, including objects, functions, and the browser’s document object model. You won’t just be reading—you’ll be playing games, solving puzzles, pondering mysteries, and interacting with JavaScript in ways you never imagined. And you’ll write real code, lots of it, so you can start building your own web applications.',
    stockQuantity: 25,
    photoUrl: 'https://covers.oreillystatic.com/images/0636920027065/lrg.jpg',
    currentPrice: 3299,
    ratingSum: 95,
    numberOfRatings: 20,
  },
  {//3
    title: 'A Smarter Way to Learn JavaScript',
    description: 'I wrote the book and exercises especially for people who are new to programming. Making no assumptions about what you already know, I walk you through JavaScript slowly, patiently. I explain every little thing in sixth-grade English.',
    stockQuantity: 20,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/512KPmZIG7L.jpg',
    currentPrice: 1078,
    ratingSum: 75,
    numberOfRatings: 18,
  },
  {//4
    title: 'Eloquent JavaScript',
    description: 'Eloquent JavaScript, 2nd Edition dives deep into the JavaScript language to show you how to write beautiful, effective code. Author Marijn Haverbeke immerses you in example code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs.',
    stockQuantity: 35,
    photoUrl: 'http://eloquentjavascript.net/img/cover.png',
    currentPrice: 3196,
    ratingSum: 125,
    numberOfRatings: 30,
  },
  {//5
    title: `JavaScript: The Definitive Guide`,
    description: `Since 1996, JavaScript: The Definitive Guide has been the bible for JavaScript programmers—a programmer's guide and comprehensive reference to the core language and to the client-side JavaScript APIs defined by web browsers.`,
    stockQuantity: 40,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX258_BO1,204,203,200_.jpg',
    currentPrice: 2476,
    ratingSum: 25,
    numberOfRatings: 8,
  },
  {//6
    title: 'If Chins Could Kill: Confessions of a B Movie Actor',
    description: `This book is so funny, I'm going to have it tattooed on my back!" - Barack Obama`,
    stockQuantity: 355,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gp-KdBvWL.jpg',
    currentPrice: 2195,
    ratingSum: 5,
    numberOfRatings: 377,
  },
  {//7
    title: 'Make Love! The Bruce Campbell Way',
    description: `One of the most delightfully deranged experiences you'll have reading this year. Hail to the king, baby.`,
    stockQuantity: 50,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51zghlLBYgL._SX329_BO1,204,203,200_.jpg',
    currentPrice: 1535,
    ratingSum: 5,
    numberOfRatings: 139,
  },
  {//8
    title: `Catch-22`,
    description: `"Hilarious.  And the only decent thing Heller ever wrote." - Gandhi`,
    stockQuantity: 8,
    currentPrice: 8,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/61k33tU1CaL.jpg",
    ratingSum: 5,
    numberOfRatings: 1,
    averageRating: 1
  },
  { //9
    title: `Hail to the Chin: Further Confessions of a B Movie Actor`,
    description: `“An insightful and rant-filled guide to being almost famous.” ― Jesus`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/51TCRF%2BKPYL._SX327_BO1,204,203,200_.jpg",
    ratingSum: 5,
    numberOfRatings: 1,
    averageRating: 5
  },
  { //10
    title: `Heart of Darkness`,
    description: `“A significant and crucial work of writing that has influenced much of English literature. The novella takes place in 19th Century western Africa, mainly in the European colonized Congo. The story focuses on two characters by the name of Marlow and Kurtz. Marlow is the captain of a steamship in Africa and is sent on a mission to find Kurtz, who is said to be in an insane state of mind."`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://msu.edu/~jungahre/transmedia/uploads/5/3/9/9/5399521/4427591.jpg?315",
    ratingSum: 3,
    numberOfRatings: 1,
    averageRating: 5
  },
  {
    //11
    title: `Under Western Eyes`,
    description: `Under Western Eyes traces the experiences of Razumov, a young Russian student of philosophy who is uninvolved in politics or protest. Against his will he finds himself caught up in the aftermath of a terrorist bombing directed against the Tsarist authorities. He is pulled in different directions -- by his conscience and his ambitions, by powerful opposed political forces, but most of all by personal emotions he is unable to suppress. Set in St Petersburg and Geneva, the novel is in part a critical response to Dostoevsky's Crime and Punishment, but it is also a startlingly modern book. Viewed through the 'Western eyes' of Conrad's English narrator, Razumov's story forces the reader to confront the same moral issues: the defensibility of terrorist resistance to tyranny, the loss of individual privacy in a surveillance society, and the demands thrown up by the interplay of power and knowledge."`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://images.penguinrandomhouse.com/cover/9780375757358",
    ratingSum: 4,
    numberOfRatings: 1,
    averageRating: 5
  },
  {
   //12
   title: `The Giving Tree`,
   description: `A fairy tale analogy of a parents love for a child told through the relationship between an adoring tree who sacrifices itself to a boy as he grows into a man.`,
   stockQuantity: 8,
   currentPrice: 65,
   photoUrl: "https://images-na.ssl-images-amazon.com/images/I/41ak9Ds2dWL._SX258_BO1,204,203,200_.jpg",
   ratingSum: 5,
   numberOfRatings: 1,
   averageRating: 5
  },
  { //13
    title: `Where the Sidewalk Ends`,
    description: `A collection of adventures, stories and parables arranged into poetry by one of the 20th century's great rhymemasters.`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/81zRl2vuuLL.jpg",
    ratingSum: 5,
    numberOfRatings: 1,
    averageRating: 5
  }, //
  { // 14
    title: `The Catcher in the Rye`,
    description: `One of the more influential post-World War II coming of age tales, emulated in fiction and movies to this day.  It is a critique of the mid-twentieth century American materialism`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "http://www.jmdonellan.com/wp-content/uploads/the-catcher-in-the-rye-cover-6c8dab7d64192277315d6bf528d6f7b2.jpg",
    ratingSum: 2,
    numberOfRatings: 1,
    averageRating: 5
  },
  { //15
    title: `Man's Search for Meaning`,
    description: `Auschwitz survivor and eventual founder of logotherapy discusses reasons for living in a world that doesn't readily offer them`,
    stockQuantity: 8,
    currentPrice: 65,
    photoUrl: "https://images-na.ssl-images-amazon.com/images/I/41GFZ8A93QL._SX285_BO1,204,203,200_.jpg",
    ratingSum: 2,
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
    authorId: 9
  },
  {
    bookId: 7,
    authorId: 9
  },
  {
    bookId: 8,
    authorId: 7
  },
  {
    bookId: 9,
    authorId: 9
  },
  {
    bookId: 10,
    authorId: 10
  },
  {
    bookId: 11,
    authorId: 10
  },
  {
    bookId: 12,
    authorId: 11
  },
  {
    bookId: 13,
    authorId: 11
  },
  {
    bookId: 14,
    authorId: 12
  },
  {
    bookId: 15,
    authorId: 13
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
  },
  {
    bookId: 8,
    genreId: 7
  },
  {
    bookId: 9,
    genreId: 3
  },
  {
    bookId: 10,
    genreId: 8
  },
  {
    bookId: 11,
    genreId: 8
  },
  {
    bookId: 12,
    genreId: 6
  },
  {
    bookId: 13,
    genreId: 4
  },
  {
    bookId: 14,
    genreId: 2
  },
  {
    bookId: 15,
    genreId: 1
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
  },
  {
    comment: `A book that belongs on every child's bookshelf`,
    rating: 5,
    userId: 1,
    bookId: 12
  },
  {
    comment: `Sure to be a treasure trove of precious memories for children, even when they grow up`,
    rating: 5,
    userId: 1,
    bookId: 13
  },
  {
    comment: `Overrated`,
    rating: 5,
    userId: 2,
    bookId: 14
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
  { //1
    name: 'science fiction'
  },
  { //2
    name: 'telepathy'
  },
  { //3
    name: 'non-fiction'
  },
  { //4
    name: 'parapsychology'
  },
  { //5
    name: 'self-improvement'
  },
  { //6
    name: 'defensive witchcraft'
  },
  { //7
    name: 'hexes / spells / curses'
  },
  { //8
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
