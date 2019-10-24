import React, {Component} from 'react';
import BookList from './BookList';
import AddBook from './AddBook';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null
        };
        this.updateBookList = this.updateBookList.bind(this)
    }

    updateBookList(book) {
        this.setState({book});
    }

    render() {
        return (
            <div id="main">
                <h1>Reading List</h1>
                <BookList newBook={this.state.book}/>
                <AddBook updateBookList={this.updateBookList} />
            </div>
        );
    }
}

export default Dashboard;
