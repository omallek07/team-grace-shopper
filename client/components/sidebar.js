import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react';

const Sidebar = (props) => {
  const { logstatus } = props;

  return (
    <Menu vertical>
      <Menu.Item>
        <Header>
          <Icon name="cube" size="huge" color="red" />
        </Header>
      </Menu.Item>
      {
        logstatus
        ?
        <Menu.Menu>
          <Menu.Item>My Account</Menu.Item>
        </Menu.Menu>
        :
        <Menu.Menu>
          <Menu.Item>Log in</Menu.Item>
          <Menu.Item>Sign up</Menu.Item>
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Sidebar;
