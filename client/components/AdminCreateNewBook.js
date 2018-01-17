import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';
import AdminNewBookForm from './AdminNewBookForm';

export default class AdminCreateNewBook extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.changeBool = this.changeBool.bind(this);
  }

  changeBool(e, {value}) {
    this.setState({value})
  }

  render() {
    const {value} = this.state;

    const orderOptions = [
      {
        key: 1,
        text: 'Add New Book',
        value: 'true'
      },
      {
        key: 2,
        text: 'Close List',
        value: 'false'
      }
    ]

    return (
      <div>
      {
        <Dropdown
          placeholder="Add new book?"
          fluid
          selection
          options={orderOptions}
          onChange={this.changeBool}
        />
      }
      {
        value === 'true' && <AdminNewBookForm value={value} />
      }
    </div>
    )
  }
}

