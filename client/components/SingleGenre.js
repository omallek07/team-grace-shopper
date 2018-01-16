import React, { Component } from 'react';
import { Card, Rating, Item, Grid, Label, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getAllBooksThunk, getGenreByIdThunk } from '../store'
import BookCard from './BookCard';

export class SingleGenre extends Component {

    componentDidMount() {
        this.props.getBooks()
    }

    render() {
        const books = this.props.books
        const id = this.props.match.params.genreId;
        const allGenreObjList = books.reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue.genres);
        }, [])
        const currentGenreObjList = allGenreObjList.filter(genre => {
            return genre.id === Number(id);
        })
        const booksByGenreId = books.filter(book => {
            const genreIds = book.genres.map(el => {
                return el.id;
            });
            if (genreIds.includes(Number(id))) {
                return book
            }
        })
        return (
            <div>
                {currentGenreObjList[0] &&
                    <Header>  {currentGenreObjList[0].name} Books </Header>
                }
                <Card.Group itemsPerRow={4}>
                    {booksByGenreId.map(book => {
                        return (
                            <React.Fragment key={book.id}>
                                <BookCard book={book} />
                            </React.Fragment>
                        );
                    })}
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
        },
        getSingleGenre() {
            dispatch(getGenreByIdThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGenre);
