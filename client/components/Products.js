import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../history';
import BookCard from './BookCard';
import { Card } from "semantic-ui-react";


// import {books} from '../server/';

function Products (props) {
    // console.log(props)
    let books = props.products
    
    
    // const x = fetchAllBooks()
    // console.log('SERVER   ',server)
    // console.log('x', x)
    return (
        <div>
            <h1> All Books</h1> 
            <Card.Group itemsPerRow={6}>               
                { books.map(book => {
                    return (
                        <BookCard book={book} key={book.id} />
                        
                    )})
                }
                </Card.Group >
        </div>
    )
}

const mapStateToProps = storeState => {
    return {
        products: storeState.products.list
    }
}

export default connect(mapStateToProps, null)(Products);


//  <div className="card" key={book.id}>
//                                 <div className="image">
//                                     <img src={book.photoUrl} />
//                                 </div>
//                                 <div className="content">
//                                     <div className="header"> {book.description} </div>
//                                     <div className="description" />
//                                 </div>
//                             </div>