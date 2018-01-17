import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Container} from 'semantic-ui-react';
import { createNewBookDispatcher } from '../store'

export class AdminNewBookForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      stockQuantity: '',
      photoUrl: '',
      currentPrice: '',
      genre: '',
      author: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onSubmitHandler() {
    const {title, description, stockQuantity, photoUrl, currentPrice, author, genre} = this.state;

    if (author.includes(' ')) {
    const splitName = author.split(' ');
    var firstName = splitName[0].toString();
    var lastName = splitName[1].toString();
    }

    const newBook = {
      title: title,
      description: description,
      stockQuantity: +stockQuantity,
      photoUrl: photoUrl,
      currentPrice: +currentPrice
    }
    const bookAuthor = { firstName: firstName, lastName: lastName || author }
    const bookGenre = { name: genre }

    this.props.createNewBookDispatcher(newBook, bookAuthor, bookGenre)
    this.setState({message: 'New book created!'})
  }

  render() {
    const bool = this.props.value;
    const {title, description, stockQuantity, photoUrl, currentPrice, genre, author} = this.state;
    return (
     <div>
     {
       bool // Yes to create new book?
       ?  <Segment>
            <Form onSubmit={this.onSubmitHandler} widths="equal" size="small">

                <Form.Input label="Title" placeholder='Title' name='title' value={title} onChange={this.handleChange} />

                <Form.Input label="Author" placeholder='Author' name='author' value={author} onChange={this.handleChange} />

                <Form.Input label="Genre" placeholder='Genre' name='genre' value={genre} onChange={this.handleChange} />

                <Form.Input label="Photo URL" placeholder='Photo URL' name='photoUrl' value={photoUrl} onChange={this.handleChange} />

                <Form.Input label="Current Price" type='number' max={500000} placeholder='Current Price' name='currentPrice' value={currentPrice} onChange={this.handleChange} />

                <Form.Input label="Stock Quantity" type='number' max={1000}placeholder='Stock Quantity' name='stockQuantity' value={stockQuantity} onChange={this.handleChange} />

                <Container>
                <Form.TextArea label="Description" placeholder='Description' name='description' value={description} onChange={this.handleChange} />
                </Container>

                <Container>
                  <Form.Button content='Submit' />
                </Container>
                {
                this.state.message && <div>{this.state.message} </div>
                }
              </Form>
            </Segment>
       : <div></div>
     }
     </div>
    )
  }
}

/* Container */

const mapState = null;

const mapDispatch = {createNewBookDispatcher}

export default connect(mapState, mapDispatch)(AdminNewBookForm)

