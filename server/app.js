const express = require('express');
const GraphQL_HTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', GraphQL_HTTP({
    schema
}));

app.listen(4000, () => {
    console.log('App listening on PORT 4000');
});