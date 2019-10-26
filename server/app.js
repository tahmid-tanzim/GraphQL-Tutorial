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
const DB_URL = `mongodb://${USER.NAME}:${USER.PASSWORD}@ds237588.mlab.com:37588/gql-ninja`;
// const DB_URL = `mongodb://${USER.NAME}:${USER.PASSWORD}@database:27017/GraphQLTutorialDB`;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Connected to Mongo Database in mLab'));

app.use(cors());
app.use('/graph', GraphQLHttp({
    schema,
    graphiql: true
}));

const server = app.listen(3001, () => console.log('App listening on PORT 3001'));

process.on('SIGINT', () => {
    mongoose.connection.close(false, () => {
        console.log('\nClose mongo database connection.');
        server.close();
        process.exit();
    });
});