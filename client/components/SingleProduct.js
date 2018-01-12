import React, {Component} from 'react';
import {Rating, Item, Grid, Label, Header, Icon} from 'semantic-ui-react'
import SingleProductReviews from './SingleProductReviews';
import {connect} from 'react-redux';
import {getBookByIdThunk, getBookReviewThunk, updateItem} from '../store'

class SingleProduct extends Component {

  componentDidMount(){
    const id = this.props.match.params.productId;
    this.props.getSingleBook(id)
  }
  render(){
    const book = this.props.singleBook;
    return (
        <div>
        {
          book.title &&
          <div>
            <Grid>
              <Grid.Row>
                <Item>
                  <Item.Image size='medium' floated = 'left' src={book.photoUrl} />
                  <Item.Content>
                    <Item.Header as = 'h1'> {book.title} </Item.Header>
                    <Item.Meta as = 'h4'> {book.authors.map(author => {
                      return (
                        <div key = {author.id}>
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
                      <b>Book Genres:</b>
                      {
                        book.genres.map(genre => {
                          return (
                            <div key={genre.id}>
                              {genre.name}
                            </div>
                          )
                        })
                      }
                    </Item.Extra>
                    <br />
                    <b>Rating</b>
                    <Rating icon = "star"
                      defaultRating={book.averageRating}
                      maxRating={5}
                      disabled
                    />({book.numberOfRatings})
                    <Item.Extra>
                      <br />
                      <Label.Group tag>
                        <Label size = "large" color = "orange">
                          Price :
                          <Label.Detail>
                            ${book.currentPrice / 100}
                          </Label.Detail>
                        </Label>
                        <Icon name='cart' size='big' onClick={() => {
                          this.props.updateItem(this.props.cart.id, this.props.singleBook.id)
                        }} />
                      </Label.Group>
                      {
                        (book.stockQuantity > 0) ?
                        <Header color ='green'>
                          In Stock.
                        </Header>
                        :
                        <Header color ='red'>
                          Out Of Stock
                        </Header>
                      }
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Grid.Row>
              <Grid.Row>
                -------------------------------
                User Reviews:
                -------------------------------
                <SingleProductReviews />
              </Grid.Row>
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
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBook(id){
      dispatch(getBookByIdThunk(id))
      dispatch(getBookReviewThunk(id))
    },
    updateItem: (orderId, bookId) => {
      dispatch(updateItem({
        orderId,
        bookId,
        orderQuantity: 1
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
