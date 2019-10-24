import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graph'
});

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <div id="main">
                <h1>Reading List</h1>
                <BookList/>
                <AddBook/>
            </div>
        </ApolloProvider>
    );
}

export default App;
