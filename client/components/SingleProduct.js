import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import SingleProductReviews from './SingleProductReviews';

function SingleProduct({ bookObjList, bookId, addBookThunk }) {

    // const selectedBook = bookObjList.filter(book => {
    //     return book.Id === bookId;
    // });

    const addBookToCart = event => {
        event.preventDefault();
    }

    const submitReview = event => {
        event.preventDefault();
    };

/*
            <div className='col-lg-4'>
                <form onSubmit={addBookToCart}>
                    <legend> Add {selectedBook.title} to cart </legend>
                    <div>
                        <button type='submit' className="btn btn-primary"> Add </button>
                    </div>
                </form>
            </div>

            <div className='col-lg-4'>
                <form onSubmit={submitReview}>
                    <fieldset>
                        <legend> Review for {selectedBook.title}</legend>
                        <div>
                            <textarea id='reviewFieldVal' rows="3" className="form-control" placeholder=". . .">
                            </textarea>
                        </div>
                        <br />
                        <div>
                            <button type='submit' className="btn btn-info">  Submit </button>
                        </div>
                    </fieldset>
                </form>
            </div>
*/

  return (
    <div>
      This is the single product page
      -------------------------------
      Reviews:
      <SingleProductReviews />
    </div>
  )
}

export default SingleProduct;
