import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries';

import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookId: null
        };
    }

    displayBooks() {
        const {data, newBook} = this.props;

        if (data.loading) return 'Loading...';
        if(newBook) {
            data.books.push(newBook);
        }

        return (<ul id="book-list">
            {data.books.map(book => <li key={book.id}
                                        onClick={(e) => this.setState({selectedBookId: book.id})}>{book.name}</li>)}
        </ul>);
    }

    render() {
        return (
            <div>
                {this.displayBooks()}
                <BookDetails bookId={this.state.selectedBookId}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
