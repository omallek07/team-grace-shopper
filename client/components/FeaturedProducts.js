import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';



function FeaturedProducts(props) {

    return (
        <div>
            <h1>Featured Bestsellers</h1>
            <div className="book-list ui link cards">
                {/* {
                    dummyBooks.map(book => {
                        return (
                            <div className="card" key={book.title}>
                                <div className="image">
                                    <img src={'./images/' + book.photoUrl} />
                                </div>
                                <div className="content">
                                    <div className="header"> {book.description} </div>
                                    <div className="description" />
                                </div>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )

}

export default FeaturedProducts;


/*
const dummyBooks = [
    {
        title: `Eloquent JavaScript`,
        description: `"I laughed. I cried. Eloquent JavaScript is better than the Bible and the Quran rolled into one.” ― Mike Kanter`,
        stockQuantity: 8,
        currentPrice: 8,
        photoUrl: "eloquentjs.png",
        ratingSum: 0,
        numberOfRatings: 1,
        averageRating: 1
    },
    {
        title: `If Chins Could Kill: Confessions of a B Movie Actor`,
        description: `"This book is so funny, I'm going to have it tattooed on my back!" - Barack Obama`,
        stockQuantity: 8,
        currentPrice: 8,
        photoUrl: "bruceifchins.jpg",
        ratingSum: 0,
        numberOfRatings: 1,
        averageRating: 1
    },
    {
        title: `Make Love! The Bruce Campbell Way`,
        description: `"One of the most delightfully deranged experiences you'll have reading this year. Hail to the king, baby."
---Rue Morgue`,
        stockQuantity: 8,
        currentPrice: 8,
        photoUrl: "bruceml.jpg",
        ratingSum: 0,
        numberOfRatings: 1,
        averageRating: 1
    },
    {
        title: `Hail to the Chin: Further Confessions of a B Movie Actor`,
        description: `"Exceptionally literate yet conversational, wide-ranging but never wandering, and copiously, gleefully illustrated…” ―Booklist`,
        stockQuantity: 8,
        currentPrice: 8,
        photoUrl: "hailtothechin.jpg",
        ratingSum: 0,
        numberOfRatings: 1,
        averageRating: 1
    },
];
*/
