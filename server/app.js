const express = require('express');
const GraphQL_HTTP = require('express-graphql');

const app = express();

app.use('/graphql', GraphQL_HTTP({

}));

app.listen(4000, () => {
    console.log('App listening on PORT 4000');
});