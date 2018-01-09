import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react';

const Navbar = (props) => {
  const { logstatus } = props;

  return (
    <Menu>
      <Menu.Item>
        <Header>
          <Icon name="cube" size="huge" color="red" />
          GRACESHOPPER
        </Header>
      </Menu.Item>
      {
        logstatus
        ?
        <Menu.Menu position="right">
          <Menu.Item>My Account</Menu.Item>
        </Menu.Menu>
        :
        <Menu.Menu position="right">
          <Menu.Item>Log in</Menu.Item>
          <Menu.Item>Sign up</Menu.Item>
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Navbar;
