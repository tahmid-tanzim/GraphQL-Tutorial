const express = require('express');
const cors = require('cors');
const GraphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

const USER = {
    NAME: 'tanzim',
    PASSWORD: 'root101'
};

const app = express();

mongoose.connect(`mongodb://${USER.NAME}:${USER.PASSWORD}@ds237588.mlab.com:37588/gql-ninja`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Connected to Mongo Database in mLab'));

app.use(cors());
app.use('/graph', GraphQLHttp({
    schema,
    graphiql: true
}));

const server = app.listen(4000, () => console.log('App listening on PORT 4000'));

process.on('SIGINT', () => {
    mongoose.connection.close(false, () => {
        console.log('\nClose mongo database connection.');
        server.close();
        process.exit();
    });
});