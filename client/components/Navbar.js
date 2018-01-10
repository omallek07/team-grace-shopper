import React from 'react';
import { Menu, Dropdown, Icon, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//
const Navbar = (props) => {
  const { logstatus, handleClick } = props;
//
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
                Home
              </Button>
            </Link>
          </Menu.Item>
          <Dropdown item icon="user">
            <Dropdown.Menu>
              <Dropdown.Item><Link to="/cart"><Button fluid>My Cart</Button></Link></Dropdown.Item>
              <Dropdown.Item><Button fluid>My Orders</Button></Dropdown.Item>
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

export default Navbar;
