import React, { Component } from 'react';
import { Rating, Item, Grid, Label, Header, Icon } from 'semantic-ui-react'
import SingleProductReviews from './SingleProductReviews';
import { connect } from 'react-redux';
import { getGenreByIdThunk } from '../store'

class SingleGenre extends Component {

    componentDidMount() {
        const id = this.props.match.params.genreId;
        this.props.getGenre(id)
    }
    
    render() {
        const genre = this.props.genre;
        console.log('GENRE    ', genre)
        
        
        
    }
}

const mapStateToProps = (state) => {
    return {
        singleGenre: state.singleGenre
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSingleGenre(id) {
            dispatch(getGenreByIdThunk(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGenre);
