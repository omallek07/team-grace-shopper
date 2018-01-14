import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {individualUserOrdersThunk} from '../store/userOrders';
import {Table, Header, Image} from 'semantic-ui-react';

class UserOrders extends Component {

  componentDidMount () {
    this.props.individualUserOrdersThunk(this.props.user.id)
  }

  render () {
    const {userOrders} = this.props;
    console.log(userOrders);

    return (
      <div>
        <Header>My Previous Orders</Header>
        { // Does user have previous orders?
          userOrders
          ?
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Purchase Date</Table.HeaderCell>
                <Table.HeaderCell>Purchase Time</Table.HeaderCell>
                <Table.HeaderCell>Items Purchased</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                userOrders.map(order => {
                return (
                  <Table.Row key={order.id}>
                    <Table.Cell>
                      {order.status}
                    </Table.Cell>
                    <Table.Cell>
                      {order.purchaseTime.slice(0, 9)}
                    </Table.Cell>
                    <Table.Cell>
                      {order.purchaseTime.slice(12, 19)}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        order.lineItems.map(item => {
                          return (
                            <div key={item.id}>
                              <Link to={`/products/${item.id}`}>
                                <Image size="mini" src={item.book.photoUrl} />
                              </Link>
                            {item.book.title}
                            {'$ ' + (item.orderPrice / 100)}
                            {item.orderQuantity}
                            </div>
                          )
                        })
                      }
                    </Table.Cell>
                  </Table.Row>
                  )
                })
              }
            </Table.Body>
          </Table>
        : // if not then display this message
        <div> You have no previous orders! </div>
      }
    </div>
    )
  }
}


//
//
/* Container */

const mapState = ({userOrders, user}) => ({
  userOrders: userOrders.filter(order => order.status !== 'cart' ),
  user})

const mapDispatch = { individualUserOrdersThunk }

export default connect(mapState, mapDispatch)(UserOrders);
