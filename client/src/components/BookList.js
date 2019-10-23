import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
{
    books {
        id
        name
    }
}
`;

class BookList extends Component {
    displayBooks() {
        const {data} = this.props;

        if (data.loading) return 'Loading...';

        return (
            <ul id="book-list">
                { data.books.map(book => <li key={book.id}>{book.name}</li>) }
            </ul>
        );
    }

    render() {
        console.log('props: ', this.props);
        return (
            <div>
                {this.displayBooks()}
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
