import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorQuery} from '../queries';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: "",
        };
        this.submitForm = this.submitForm.bind(this);
    }

    displayAuthors() {
        const {data} = this.props;

        if (data.loading) return 'Loading...';

        return (<select onChange={e => this.setState({authorId: e.target.value})}>
            {data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
        </select>);
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
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

export default graphql(getAuthorQuery)(AddBook);