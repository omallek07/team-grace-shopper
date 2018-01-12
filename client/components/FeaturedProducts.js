import React, { Component } from 'react';
import { connect } from 'react-redux'
import BookCard from './BookCard';
import { Card, Header } from 'semantic-ui-react';
import { getAllBooksThunk } from '../store'
import PropTypes from 'prop-types'

export class FeaturedProducts extends Component {

    componentDidMount() {
        this.props.getBooks()
    }

    render() {
        let books = this.props.books

        return (
            <div>
                <Header>Featured Bestsellers</Header>
                <Card.Group >
                    {books.map(book => {
                        if (book.title.includes("Bruce") ||
                            ((book.authors[0]) && (book.authors[0].firstName === "Bruce"
                                && book.authors[0].lastName === "Campbell"))) {
                            return (
                                <React.Fragment key={book.id}>
                                    <BookCard book={book} />
                                </React.Fragment>
                            )
                        }
                    })
                    }
                </Card.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBooks() {
            dispatch(getAllBooksThunk())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);

FeaturedProducts.propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
}
