// import _ from 'lodash'
import { connect } from 'react-redux';
import React, { Component } from 'react'
import history from '../history';
import { Search, Grid } from 'semantic-ui-react'
import { findBookByTitleThunk } from '../store/searchBookResult';


export class SearchForm extends Component {
  constructor() {
    super()
      this.state = {
        isLoading: false,
        value: ''
      }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)

  }

  handleResultSelect = (e, { result }) => {
    history.push(`/products/${result.id}`)
  }


  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length > 1) {
        this.setState({ isLoading: false })
        this.props.findBookByTitleThunk(this.state.value)
      }
    }, 500)
  }

  render() {
    const { isLoading, value } = this.state;
    const { result } = this.props;
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={result}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

/* Container */

const mapState = ({searchBookResult}) => ({ result: searchBookResult});

const mapDispatch = { findBookByTitleThunk };

export default connect(mapState, mapDispatch)(SearchForm)
