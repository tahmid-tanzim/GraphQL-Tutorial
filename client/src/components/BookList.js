import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

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
        const { loading, error, data } = useQuery(getBooksQuery);

        if(loading) {
            return <div>Loading...</div>;
        } else if(error) {
            return <div>Error :(</div>;
        } else {
            return data.books.map(book => <li key={book.id}>{ book.name }</li>);
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
            </div>
        );
    }
}

export default BookList;
