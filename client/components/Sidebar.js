import React from 'react';
import { Menu, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//
const Sidebar = (props) => {
  const { logstatus } = props;
//
  return (
    <Menu vertical>
      <Menu.Item>
        <Header>
          <Icon name="cube" size="huge" color="red" />
          Welcome
        </Header>
      </Menu.Item>
      <Menu.Item>
        <Link to="/home">
          <Button fluid>
            <Icon name="home" />
            Home
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/products">
          <Button fluid>
            <Icon name="book" />
            Books
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/cart">
          <Button fluid>
            <Icon name="cart" />
            Cart
          </Button>
        </Link>
      </Menu.Item>
    {
      logstatus // is user logged in or not?
      ?
        <Menu.Item>
          <Link to="/userAccountDash">
            <Button fluid>
              <Icon name="user" />
              My Account
            </Button>
          </Link>
        </Menu.Item>
      :
        <Menu.Item>
          <Link to="/signup">
            <Button fluid>
              <Icon name="user" />
              Sign up
            </Button>
          </Link>
        </Menu.Item>
      }
    </Menu>
  )
}

export default Sidebar;
