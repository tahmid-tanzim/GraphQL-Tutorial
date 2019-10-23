const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const Book = require('./models/book');
const Author = require('./models/author');

// Dummy Data
// const books = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//     {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
//     {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
//     {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
// ];
//
// const authors = [
//     {name: 'Patrick Rothfuss', age: 44, id: '1'},
//     {name: 'Brandon Sanderson', age: 42, id: '2'},
//     {name: 'Terry Pratchett', age: 66, id: '3'},
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                // return authors.find(({id}) => parent.authorId === id);
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve: (parent, args) => {
                // return books.filter(({authorId}) => parent.id === authorId);
                return Book.find({
                    authorId: parent.id
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                // return books.find(({id}) => args.id === id);
                return Book.findById(args.id);
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve: (parent, args) => {
                // return books;
                return Book.find({})
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                // return authors.find(({id}) => args.id === id);
                return Author.findById(args.id);
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve: (parent, args) => {
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                let authorObj = new Author({
                    name: args.name,
                    age: args.age
                });

                return authorObj.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                let bookObj = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return bookObj.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});