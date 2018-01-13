import React, {Component} from 'react';
import { connect } from 'react-redux';
import {individualUserReviewsThunk} from '../store/userReviews';
import {Table, Header, Rating} from 'semantic-ui-react';

class UserReviews extends Component {

  componentDidMount () {
    this.props.individualUserReviewsThunk(this.props.user.id)
  }

  render () {
    const {userReviews} = this.props;

    return (
      <div>
        <Header>My Reviews</Header>
        { // Does user have reviews?
          userReviews
          ?
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Book Name</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Review</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                userReviews.map(review => {
                return (
                  <Table.Row key={review.id}>
                    <Table.Cell>
                      {review.bookId}
                    </Table.Cell>
                    <Table.Cell>
                      <Rating icon="star" defaultRating={review.rating} maxRating={5} disable />
                    </Table.Cell>
                    <Table.Cell>
                      {review.comment}
                    </Table.Cell>
                    <Table.Cell>
                      {review.createdAt.slice(0, 9)}
                    </Table.Cell>
                  </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        : // if not then display this message
        <div> You have no previous reviews! </div>
      }
    </div>
    )
  }
}


//
//
/* Container */

const mapState = ({userReviews, user}) => ({
  userReviews,
  user})

const mapDispatch = { individualUserReviewsThunk }

export default connect(mapState, mapDispatch)(UserReviews);
