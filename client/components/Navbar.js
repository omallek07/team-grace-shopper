import React from 'react';
import { Menu, Dropdown, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//
const Navbar = (props) => {
  const { logstatus, isAdmin, handleClick } = props;

  return (
    <Menu>
      <Menu.Item>
        <Header>
          <Icon name="cube" size="huge" color="red" />
          GRACESHOPPER
        </Header>
      </Menu.Item>
      {
        logstatus //is user logged in or not?
          ?
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/home">
                <Button primary>
                  <Icon name="home" />
                  Home
              </Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/cart">
                <Button primary>
                  <Icon name="cart" />
                  My Cart ({props.numberOfItems})
              </Button>
              </Link>
            </Menu.Item>
            <Dropdown item icon="user" pointing>
              <Dropdown.Menu>
                <Dropdown.Item><Link to="/userAccountDash"><Button fluid>My Account</Button></Link></Dropdown.Item>
                <Dropdown.Item><Link to="/userOrders"><Button fluid>Previous Orders</Button></Link></Dropdown.Item>
                <Dropdown.Item><Link to="/userReviews"><Button fluid>My Reviews</Button></Link></Dropdown.Item>
                <Dropdown.Item><Button fluid onClick={handleClick}>Log Out</Button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/login">
                <Button secondary>
                  Log In
              </Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup">
                <Button primary>
                  Sign Up
            </Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
      }
    </Menu>
  )
}

const mapState = state => {
  return {
    numberOfItems: state.cart.lineItems && state.cart.lineItems.map(x => x.orderQuantity).reduce((a,b) => a+b, 0)
  }
}

export default connect(mapState)(Navbar);
