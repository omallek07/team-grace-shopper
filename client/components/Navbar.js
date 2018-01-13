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
        { // view adminDash if logged in as admin
          isAdmin &&
          <Menu.Item>
            <Link to="/adminDash">
              <Button primary>
                <Icon name="user circle outline" />
                  Admin Dashboard
              </Button>
            </Link>
          </Menu.Item>
        }
        {  // If logged in, view drop down
          logstatus &&
            <Dropdown item icon="user" pointing>
              <Dropdown.Menu>
                <Dropdown.Item><Link to="/userAccountDash"><Button fluid>My Account</Button></Link></Dropdown.Item>
                <Dropdown.Item><Link to="/userOrders"><Button fluid>Previous Orders</Button></Link></Dropdown.Item>
                <Dropdown.Item><Link to="/userReviews"><Button fluid>My Reviews</Button></Link></Dropdown.Item>
                <Dropdown.Item><Button fluid onClick={handleClick}>Log Out</Button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        }
        { //not logged in view login and signup
          !logstatus &&
          <Menu.Item>
            <Link to="/login">
              <Button>
                Log In
              </Button>
            </Link>
          </Menu.Item>
        }
        {
          !logstatus &&
          <Menu.Item>
            <Link to="/signup">
              <Button>
                Sign Up
              </Button>
            </Link>
          </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  )
}

const mapState = state => {
  return {
    numberOfItems: state.cart && state.cart.map(x => x.orderQuantity).reduce((a,b) => a+b, 0)
  }
}

export default connect(mapState)(Navbar);
