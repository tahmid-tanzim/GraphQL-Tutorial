import {gql} from 'apollo-boost';

const getBooksQuery = gql`
{
    books {
        id
        name
    }
}
`;

const getAuthorQuery = gql`
{
    authors {
        id
        name
    }
}
`;

export {getBooksQuery, getAuthorQuery};