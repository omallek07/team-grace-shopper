import React, {Component} from 'react';
import { connect } from 'react-redux'
import BookCard from './BookCard';
import { Card, Header } from 'semantic-ui-react';
import {getAllBooksThunk} from '../store'


class Products extends Component {

  componentDidMount(){
    this.props.getBooks()
  }
  render(){
    let books = this.props.books
    return (
      <div>
        <Header> All Books </Header>
        <Card.Group itemsPerRow={4}>
          { books.map(book => {
            return (
              <React.Fragment key={book.id}>
                <BookCard book={book} />
              </React.Fragment>
            )
          })
        }
        </Card.Group>
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
