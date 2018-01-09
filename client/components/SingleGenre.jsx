import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

function SingleGenre({ bookObjList, bookId, genreId, selectedGenre }) {

    const compare = (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    }

    // const booksOfGenre = bookObjList.filter(book => {
    //     return book.genre === selectedGenre;
    // }).sort(compare);

    /* <h1> {selectedGenre} </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th> Title </th>
                        
                        <th> Author </th>
                        <th> Price </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booksOfGenre.map(book => {
                            return (
                                <tr key={book.id}>
                                    <td> {book.title} </td>
                                    <td> <Link to={`/books/${book.id}`}>{book.author} </Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */

    return (
        <div>
          <h1> Genre Books placeholder </h1>
        </div>
    )
}

export default SingleGenre;
