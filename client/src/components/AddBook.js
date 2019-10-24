import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthorQuery = gql`
{
    authors {
        id
        name
    }
}
`;

class AddBook extends Component {
    displayAuthors() {
        const {data} = this.props;

        if (data.loading) return 'Loading...';

        return (<select>
            {data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
        </select>);
    }

    render() {
        return (
            <form id="add-book">
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    {this.displayAuthors()}
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default graphql(getAuthorQuery)(AddBook);
