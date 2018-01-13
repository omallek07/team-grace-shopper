import React from 'react';
import { Card, Image, Icon, Rating, Grid } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import { updateItem } from '../store';
import {connect} from 'react-redux'

const BookCard = (props) => {

    const book = props.book;

    return (

        <Card centered >
          <NavLink to = {`/products/${book.id}`}>
            <Image className="cardImage" src={book.photoUrl} />
          </NavLink>
          <Card.Content>
            <NavLink to = {`/products/${book.id}`}>
              <Card.Header>
                  {book.title}
              </Card.Header>
            </NavLink>
            <Card.Meta>
                {book.authors.map(author => author.firstName + ' ' + author.lastName).join('; ')}
            </Card.Meta>
          </Card.Content>
            <Card.Content extra textAlign="right">
                <Grid columns={2} >
                    <Grid.Column textAlign="left">
                        <Rating icon="star" defaultRating={book.averageRating
                    } maxRating={5} disabled />
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {"$" + (book.currentPrice / 100)}
                        <Icon name='cart' link corner bordered onClick={() => {
                          props.updateItem(props.book.id)
                        }}/>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>
    )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    updateItem: (bookId) => {
      dispatch(updateItem({
        bookId
      }))
    }
  }
}

export default connect(mapState, mapDispatch)(BookCard);
