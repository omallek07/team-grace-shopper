import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../history';

// import {books} from '../server/';

function Products (props) {
    // console.log(props)
    let dummyBooks = props.products
    
    // const x = fetchAllBooks()
    // console.log('SERVER   ',server)
    // console.log('x', x)
    return (
        <div>
            <h1>Books</h1>
            <div className="book-list ui link cards">
                
                    { dummyBooks.map(book => {
                        return (
                            <div className="card" key={book.id}>
                                <div className="image">
                                    <img src={book.photoUrl} />
                                </div>
                                <div className="content">
                                    <div className="header"> {book.description} </div>
                                    <div className="description" />
                                </div>
                            </div>
                        )
                    }) }
                
            </div>
        </div>
    )
}

const mapStateToProps = storeState => {
    return {
        products: storeState.products.list
    }
}

export default connect(mapStateToProps, null)(Products);
