import React, { Component } from 'react';
import { Rating, Item, Grid, Label, Header, Icon } from 'semantic-ui-react'
import SingleProductReviews from './SingleProductReviews';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBookByIdThunk, getBookReviewThunk, updateItem } from '../store'
import ReviewInput from './ReviewInput'

class SingleProduct extends Component {

  componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.getSingleBook(id)
  }

  componentWillUpdate(nextProps) {
    const currentProps = this.props.match.params.productId;
    const newProps = nextProps.match.params.productId;
    if (newProps !== currentProps) {
      this.props.getSingleBook(newProps)
    }
  }

  render() {
    const book = this.props.singleBook;
    return (
      <div>
        {
          book.title &&
          <div>
            <Grid>
              <Grid.Row>
                <Item>
                  <Item.Image size='medium' floated='left' src={book.photoUrl} />
                  <Item.Content>
                    <Item.Header as='h1'> {book.title} </Item.Header>
                    <Item.Meta as='h4'> {book.authors.map(author => {
                      return (
                        <div key={author.id}>
                          {author.firstName + ' ' + author.lastName}
                          <br />
                        </div>
                      )
                    })}</Item.Meta>
                    <Item.Description>
                      {book.description}
                    </Item.Description>
                    <br />
                    <Item.Extra>
                      <b>Genre:  </b>
                      {
                        book.genres.map(genre => {
                          return (
                            <NavLink key={genre.id} to={`/products/genre/${genre.id}`}>
                              {genre.name} <span>&nbsp;</span>
                            </NavLink>
                          )
                        })
                      }
                    </Item.Extra>
                    <br />
                    <b>Rating</b>
                    <Rating icon="star"
                      maxRating={5}
                      defaultRating={Math.round(book.averageRating)}
                      disabled
                    />({book.numberOfRatings})
                    <Item.Extra>
                      <br />
                      <Label.Group tag>
                        <Label size="large" color="orange">
                          Price :
                          <Label.Detail>
                            ${book.currentPrice / 100}
                          </Label.Detail>
                        </Label>
                        <Icon name='cart' size='big' onClick={() => {
                          if (this.props.user.id)
                          {
                            this.props.updateItem(this.props.singleBook.id, this.props.user.id)
                          }
                          else {
                            this.props.updateItem(this.props.singleBook.id)
                          }
                        }} />
                      </Label.Group>
                      {
                        (book.stockQuantity > 0) ?
                          <Header color='green'>
                            In Stock.
                        </Header>
                          :
                          <Header color='red'>
                            Out Of Stock
                        </Header>
                      }
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Grid.Row>
              <Grid.Row>
                <ReviewInput />
              </Grid.Row>
              <Grid.Row>
                <h3>User Reviews:</h3>
               </Grid.Row>
               <SingleProductReviews id="singprod" />
            </Grid>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singleBook: state.singleBook,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBook(id) {
      dispatch(getBookByIdThunk(id))
      dispatch(getBookReviewThunk(id))
    },
    updateItem: (bookId,userId) => {
      dispatch(updateItem({
        bookId,
        userId
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
