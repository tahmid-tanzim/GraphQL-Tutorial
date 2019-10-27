const express = require('express');
const cors = require('cors');
const GraphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

// const Book = require('./models/book');
// const Author = require('./models/author');

const USER = {
    NAME: 'tanzim',
    PASSWORD: 'root101'
};

const app = express();
// const DB_URL = `mongodb://${USER.NAME}:${USER.PASSWORD}@ds237588.mlab.com:37588/gql-ninja`;
const DB_URL = `mongodb://${USER.NAME}:${USER.PASSWORD}@database:27017/graphql-tutorial`;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to Mongo Database in mLab'),
        err => console.log('DB Error: ', err));

app.use(cors());
app.use('/graph', GraphQLHttp({
    schema,
    graphiql: true
}));

// app.get('/init', (req, res) => {
//     Author.find({})
//         .sort('name')
//         .exec((err, authors) => {
//             if (err) res.status(400).json({err});
//             res.status(200).json({id: 1, authors});
//         });
// });

const server = app.listen(3001, () => console.log('App listening on PORT 3001'));

process.on('SIGINT', () => {
    mongoose.connection.close(false, () => {
        console.log('\nClose mongo database connection.');
        server.close();
        process.exit();
    });
});