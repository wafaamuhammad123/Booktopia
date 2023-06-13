import React, { Component } from 'react';
import { fetchBooks } from "../../api";
import Book from './book';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
  }

  componentDidMount() {
    fetchBooks()
      .then((data) => {
        this.setState({ allBooks: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderBooks = () => {
    return this.state.allBooks.map((book) => (
      <Book oneBook={book} key={book._id} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderBooks()}
      </div>
    );
  }
}

export default Books;
