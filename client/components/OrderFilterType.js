import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const OrderFilterType = (props) => {
  const filteredOrders = props.type;
  return (
    <div>
      <Table structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Purchase Time</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Items</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            filteredOrders && filteredOrders.map(order => {
              return (
                <Table.Row key={order.id}>
                  <Table.Cell>
                    {order.status}
                  </Table.Cell>
                  <Table.Cell>
                    {order.purchaseTime}
                  </Table.Cell>
                  <Table.Cell>
                    {order.user.name}
                  </Table.Cell>
                  <Table.Cell>
                    {
                      order.address.streetTwo ?
                      <div>
                      Address: {`${order.address.streetOne}, ${order.address.streetTwo}, ${order.address.city}, ${order.address.zip}, ${order.address.state}`}
                      </div>
                      :
                      <div>
                      Address: {`${order.address.streetOne}, ${order.address.city}, ${order.address.zip}, ${order.address.state}`}
                      </div>
                    }
                  </Table.Cell>
                    <Table.Cell>
                      Items: {
                        order.lineItems.map(item => {
                          return (
                            <div key={item.id}>
                            {item.orderPrice}
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
    </div>
  )
}

export default OrderFilterType;
