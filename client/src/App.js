import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Dashboard from './components/Dashboard';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graph'
});

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <Dashboard/>
        </ApolloProvider>
    );
}

export default App;
