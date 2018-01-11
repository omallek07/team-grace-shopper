import React from 'react';
import { Card, Image, Icon, Rating, Grid } from "semantic-ui-react";

const BookCard = (props) => {

    const book = props.book;
    console.log('book', book)

    return (
        <div>
            {
            book &&
            <Card >
                <Image size="small" src={book.photoUrl} />
                <Card.Content>
                    <Card.Header>
                        {book.title}
                    </Card.Header>
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
