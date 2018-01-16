import React, { Component } from 'react';
import { Card, Rating, Item, Grid, Label, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getGenreByIdThunk } from '../store'
import { NavLink } from 'react-router-dom';
import BookCard from './BookCard';

class SingleGenre extends Component {

    componentDidMount() {
        const id = this.props.match.params.genreId;
        // console.log('GENRE PROPS     ', this.props)
        this.props.getSingleGenre(id);
    }

    render() {
        const books = this.props.singleGenre.books;
        // console.log('books    ', books)
        const genre = this.props.singleGenre.name;
        // console.log('GENRE', genre)
        // console.log('PROPS    ',this.props)
        return (
            <div>
            <h1>{genre} Books</h1>
                {books &&
                books.map(book => {
                    return (<div key={book.id}>

                        {book.title}
                        </div>
                    )
                } )

                }
            </div>
        )

    }
}

/*
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
  )
*/

const mapStateToProps = (state) => {
    return {
        singleGenre: state.singleGenre,
        // books: state.singleGenre.books
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSingleGenre(id) {
            dispatch(getGenreByIdThunk(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGenre);
