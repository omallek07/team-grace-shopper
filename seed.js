const {db} = require('./server/db');
const {
  Author,
  Address,
  Genre,
  LineItems,
  Order,
  Book,
  Review,
  User
} = require('./server/db')


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
  {
    title: 'Milton',
    description: 'Vasani',
    stockQuantity: 'milton1232@hotmail.com',
    photoUrl: 3.59,
    currentPrice: 2,
    ratingSum:33,
    numberOfRatings:20,
  },
  {
    title: 'Harry',
    description: 'Potter',
    stockQuantity: 'harrypotter@hogwards.com',
    photoUrl: 2.45,
    currentPrice: 3,
    ratingSum:33,
    numberOfRatings:20,
  },
  {
    title: 'Sweetu',
    description: 'Patel',
    stockQuantity: 'sweetupatel@gmail.com',
    photoUrl: 3.75,
    currentPrice: 3,
    ratingSum:33,
    numberOfRatings:20,
  },
  {
    title: 'Harnish',
    description: 'Shah',
    stockQuantity: 'harnishshah@gmail.com',
    photoUrl: 3.00,
    currentPrice: 4,
    ratingSum:33,
    numberOfRatings:20,
  },
  {
    firstName: 'Keya',
    lastName: 'Pholes',
    email: 'keya@foles.com',
    gpa: 3.94,
    campusId: 4
  }
];

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
    email:'grubbycoder@gmail.com',
    password:'hello',
    firstName:'Erda',
    lastName:'Wadleigh',
    isAdmin: false,
    addressId: 1
  },
  {
    email:'cageycoder@gmail.com',
    password:'hellothere',
    firstName:'Tiler',
    lastName:'Thurston',
    isAdmin: false,
    addressId: 3
  },
  {
    email:'aspiring@gmail.com',
    password:'abcd',
    firstName:'Leandra',
    lastName:'Franconi',
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
  {
    email: 'rutvikhp@gmail.com',
    password: 'rutu8534',
    firstName: 'Rutvik',
    lastName: 'Patel',
    isAdmin: true,
    addressId: 2
  }
]

// const seed = () =>
//   Promise.all(campuses.map(campus =>
//     Campuses.create(campus))
//   )
//   .then(() =>
//   Promise.all(students.map(student =>
//     Students.create(student))
//   )
// );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      console.log(db.models.bookAuthors.findAll());
      return seed();
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
