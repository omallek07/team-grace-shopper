import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
// import history from '../history';
// import SingleProductReviews from './SingleProductReviews';
import {connect} from 'react-redux';
import {getBookByIdThunk} from '../store'

class SingleProduct extends Component {
  constructor(){
    super()
  }
  componentDidMount(){
    const id = this.props.match.params.productId;
    this.props.getSingleBook(id)
  }
  render(){
    console.log(this.props.singleBook)
    return (
      <div>
        This is the single product page
        -------------------------------
        Reviews:
        {/* <SingleProductReviews /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    singleBook: state.singleBook
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleBook(id){
      dispatch(getBookByIdThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
