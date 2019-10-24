import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries';

class BookDetails extends Component {
    render() {
        return (
            <div id="book-details">
               <p>Book Details</p>
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookDetails);
