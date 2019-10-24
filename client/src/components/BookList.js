import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries';

class BookList extends Component {
    displayBooks() {
        const {data} = this.props;

        if (data.loading) return 'Loading...';

        return (<ul id="book-list">
            {data.books.map(book => <li key={book.id}>{book.name}</li>)}
        </ul>);
    }

    render() {
        return (
            <div>
                {this.displayBooks()}
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
