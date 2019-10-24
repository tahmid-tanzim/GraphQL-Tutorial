import {gql} from 'apollo-boost';

const getBookQuery = gql`query($id: ID!) {
    book(id: $id) {
        id
        name
        genre
        author {
            id
            name
            age
            books {
                id
                name
            }
        }
    }
}`;

const getBooksQuery = gql`query {
    books {
        id
        name
    }
}`;

const getAuthorQuery = gql`query {
    authors {
        id
        name
    }
}`;

const addBookMutation = gql`mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
        id
        name
    }
}`;

export {getBookQuery, getBooksQuery, getAuthorQuery, addBookMutation};