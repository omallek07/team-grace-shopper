import React, {Component} from 'react';
import { Image, Table, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {updateOrderStatusThunk } from '../store/adminAllOrders';

export class OrderFilterType extends Component {
  constructor(props) {
    super(props)
    this.onSelectHandler = this.onSelectHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      this.props = nextProps.type;
    }
  }

  onSelectHandler(e, data) {
    const id = data.id;
    const status = data.value;
    this.props.updateOrderStatusThunk(id, status)
  }

  render() {
    const filteredOrders = this.props.type;
    const selectOptions = [
      {
        key: 1,
        text: 'Completed',
        value: 'completed'
      },
      {
        key: 2,
        text: 'Processing',
        value: 'processing'
      },
      {
        key: 3,
        text: 'Cancelled',
        value: 'cancelled'
      },
      {
        key: 4,
        text: 'Created',
        value: 'cart'
      }
    ]

    return (
      <div>
       { filteredOrders.length ? <Table compact collapsing celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Purchase Date</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Order</Table.HeaderCell>
              <Table.HeaderCell>QNTY</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              filteredOrders && filteredOrders.map(order => {
                return (
                  <Table.Row key={order.id}>
                    <Table.Cell>
                      {order.id}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        id={order.id}
                        name={order.status}
                        defaultValue={order.status}
                        fluid
                        selection
                        options={selectOptions}
                        onChange={this.onSelectHandler}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {
                        order.purchaseTime && order.purchaseTime.slice(0, 9)
                      }
                    </Table.Cell>
                    { // Is order tied to user or visitor?
                      order.user && order.user.name
                      ? <Table.Cell>{order.user.name}</Table.Cell>
                      : <Table.Cell>Guest</Table.Cell>
                    }
                    <Table.Cell>
                      {
                        order.address  //is address confirmed?
                        ?
                        <div>
                          {`${order.address.streetOne} ${order.address.streetTwo || ' '}, ${order.address.city}, ${order.address.state}, ${order.address.zip}`}
                        </div>
                        :
                        <div>
                          Not Yet Confirmed
                        </div>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        order.lineItems && order.lineItems.map(item => {
                          return (
                            <div key={item.id}>
                              <Link to={`/products/${item.id}`}>
                                <Image floated="left" size="mini" src={item.book.photoUrl} />
                              </Link>
                            </div>
                          )
                        })
                      }
                    </Table.Cell>
                  <Table.Cell>
                      {
                        order.lineItems && order.lineItems.map(item => {
                          return (
                            <div key={item.id}>
                              {item.orderQuantity}
                            </div>
                          )
                        })
                      }
                  </Table.Cell>
                  <Table.Cell>
                      {
                        order.lineItems && order.lineItems.map(item => {
                          return (
                            <div key={item.id}>
                              {`$${item.orderPrice / 100}`}
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
          : <div></div>
        }
      </div>
    )
  }
}

/* Container */

const mapState = null;

const mapDispatch = { updateOrderStatusThunk }

export default connect(mapState, mapDispatch)(OrderFilterType)
