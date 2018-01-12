import React, {Component} from 'react';
import {Image, Item, Grid} from 'semantic-ui-react'
import SingleProductReviews from './SingleProductReviews';
import {connect} from 'react-redux';
import {getBookByIdThunk, getBookReviewThunk} from '../store'

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
    singleBook: state.singleBook
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBook(id){
      dispatch(getBookByIdThunk(id))
      dispatch(getBookReviewThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
