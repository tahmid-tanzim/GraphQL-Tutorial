const express = require('express');
const GraphQLHttp = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graph', GraphQLHttp({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('App listening on PORT 4000');
});