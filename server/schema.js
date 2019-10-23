const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

const Book = require('./models/book');
const Author = require('./models/author');

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
                name: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)}
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
                name: {type: GraphQLNonNull(GraphQLString)},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLNonNull(GraphQLID)}
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