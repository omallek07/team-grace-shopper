import React from 'react';
import { Menu, Icon, Header, Button, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

//
const Sidebar = (props) => {
  const { logstatus, isAdmin } = props;
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
        {
          isAdmin ?  //Is user admin or shopper?
            <Link to="/adminDash">
              <Button fluid>
                <Icon name="user circle outline" />
                Admin Dashboard
          </Button>
            </Link>
            :
            <Link to="/cart">
              <Button fluid>
                <Icon name="cart" />
                My Cart
          </Button>
            </Link>
        }
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
      <Menu.Item>
        <Button>
          <Dropdown item fluid className="ui button" text='Genres'>
            <Dropdown.Menu>
              {
                props.genres.map(genre => (
                  <Dropdown.Item
                    key={genre.id}
                  >
                    <NavLink
                      to={`/products/genre/${genre.id}`}>{genre.name}</NavLink>
                  </Dropdown.Item>
                ))
              }
            {/* <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' /> */}
            </Dropdown.Menu>
          </Dropdown>
        </Button>
      </Menu.Item>
    </Menu>
  )
}

const mapState = state => {
  return {
    genres: state.genres
  }
}

export default connect(mapState)(Sidebar);
