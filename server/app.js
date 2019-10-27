const express = require('express');
const cors = require('cors');
const GraphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

// const Book = require('./models/book');
const Author = require('./models/author');

const USER = {
    NAME: 'tanzim',
    PASSWORD: 'root101'
};

// const {
//     MONGO_USERNAME,
//     MONGO_PASSWORD,
//     MONGO_HOSTNAME,
//     MONGO_PORT,
//     MONGO_DB
// } = process.env;

const port = process.env.PORT || 3001;

const app = express();
// const URL = `mongodb://${USER.NAME}:${USER.PASSWORD}@ds237588.mlab.com:37588/gql-ninja`;
const URL = `mongodb://@database:27017/admin`;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB Error: ', err));

app.use(cors());
app.use('/graph', GraphQLHttp({
    schema,
    graphiql: true
}));

app.get('/init', (req, res) => {
    Author.find({})
        .sort('name')
        .exec((err, authors) => {
            if (err) res.status(400).json({err});
            res.status(200).json({id: 1, authors});
        });
});

const server = app.listen(port, () => console.log('Express App listening on PORT ' + port));

process.on('SIGINT', () => {
    mongoose.connection.close(false, () => {
        console.log('\nClose mongo database connection.');
        server.close();
        process.exit();
    });
});