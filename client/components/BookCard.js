import React from 'react';
import { Card, Image, Icon, Rating, Grid } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

const BookCard = (props) => {

    const book = props.book;

    return (
        <div>
            {
            book &&
            <Card >
              <NavLink to = {`/products/${book.id}`}>
                <Image size="small" src={book.photoUrl} />
              </NavLink>
              <Card.Content>
                <NavLink to = {`/products/${book.id}`}>
                  <Card.Header>
                      {book.title}
                  </Card.Header>
                </NavLink>
                <Card.Meta>
                    Bruce Campbell
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
                            <Icon name='cart' link corner bordered />
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
            }
        </div>
    )
}

export default BookCard;
