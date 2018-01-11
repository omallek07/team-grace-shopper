import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import history from '../history';
import BookCard from './BookCard';
import { Card } from "semantic-ui-react";
import {getAllBooksThunk} from '../store'


class Products extends Component {
  constructor(){
    super()
  }
  componentDidMount(){
    this.props.getBooks()
  }
  render(){
  let books = this.props.books
  return (
    <div>
      <h1> All Books</h1>
      <Card.Group itemsPerRow={6} >
        { books.map(book => {
          return (
              <BookCard book={book} key={book.id} />
          )})
        }
        </Card.Group >
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getBooks(){
      dispatch(getAllBooksThunk())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);


//  <div className="card" key={book.id}>
//                                 <div className="image">
//                                     <img src={book.photoUrl} />
//                                 </div>
//                                 <div className="content">
//                                     <div className="header"> {book.description} </div>
//                                     <div className="description" />
//                                 </div>
//                             </div>
