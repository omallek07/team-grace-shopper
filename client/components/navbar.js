import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { logstatus, handleClick } = props;
  console.log(logstatus)
  console.log('handle', handleClick)

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
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item>My Account</Menu.Item>
        </Menu.Menu>
        :
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/login">Log in</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup">Sign up</Link>
          </Menu.Item>
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Navbar;
