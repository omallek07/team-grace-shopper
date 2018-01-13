import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allOrdersThunk } from '../store/adminAllOrders';
import OrderFilterType from './OrderFilterType';
import { Dropdown } from 'semantic-ui-react';

export class AdminOrdersInfo extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount () {
    this.props.allOrdersThunk()
  }

  changeHandler(e, {value}) {
    this.setState({value})
  }

  render () {

    const value = this.state.value;
    const orderOptions = [
        {
          key: 1,
          text: 'All Orders',
          value: 'allOrders'
        },
        {
          key: 2,
          text: 'Created Orders',
          value: 'createdOrders'
        },
        {
          key: 3,
          text: 'Processing Orders',
          value: 'processingOrders'
        },
        {
          key: 4,
          text: 'Cancelled Orders',
          value: 'cancelledOrders'
        },
        {
          key: 5,
          text: 'Completed Orders',
          value: 'completedOrders'
        },
        {
          key: 6,
          text: 'Close List',
          value: 'empty'
        }
      ]


    return (
      <div>
        {
        <Dropdown
          placeholder="Select Order Type"
          fluid
          selection
          options={orderOptions}
          onChange={this.changeHandler}
        />
        }
        {
          value && <OrderFilterType type={this.props[value]} />
        }
      </div>
    )
  }
}


/* Container */

const mapState = ({adminAllOrders}) => ({
  allOrders: adminAllOrders,
  createdOrders: adminAllOrders.filter(order => order.status === 'cart'),
  processingOrders: adminAllOrders.filter(order => order.status === 'processing' ),
  cancelledOrders: adminAllOrders.filter(order => order.status === 'cancelled' ),
  completedOrders: adminAllOrders.filter(order => order.status === 'completed' ),
  empty: []
 })

const mapDispatch = { allOrdersThunk }

export default connect(mapState, mapDispatch)(AdminOrdersInfo)
