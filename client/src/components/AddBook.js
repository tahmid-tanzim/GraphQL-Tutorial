import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {compose} from 'redux';
import {getBooksQuery, getAuthorQuery, addBookMutation} from '../queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
        this.submitForm = this.submitForm.bind(this);
    }

    displayAuthors() {
        const {getAuthor} = this.props;

        if (getAuthor.loading) return 'Loading...';

        return (<select onChange={e => this.setState({authorId: e.target.value})}>
            {getAuthor.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
        </select>);
    }

    submitForm(e) {
        e.preventDefault();
        const {name, genre, authorId} = this.state;

        this.props.addBook({
            variables: {name, genre, authorId},
            refetchQueries: [{query: getBooksQuery}]
        }).then(({data}) => {
            console.log('Success addBookResponse: ', data.addBook);
        }, (error) => console.error('Error addBookResponse: ', error));
    }

    render() {
        return (
            <form id="add-book"
                  onSubmit={this.submitForm}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text"
                           onChange={e => this.setState({name: e.target.value})}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"
                           onChange={e => this.setState({genre: e.target.value})}/>
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


export default compose(
    graphql(getAuthorQuery, {name: "getAuthor"}),
    graphql(addBookMutation, {name: "addBook"})
)(AddBook);
