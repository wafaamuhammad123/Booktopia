import React, { Component } from 'react';
import { fetchBooks } from "../../api";
import { fetchDeleteBook } from '../../api';
import Sidebar from '../admin_dashboard/sidebar';
import './index.css' 
import { NavLink } from 'react-router-dom';
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

  handleDeleteBook = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      fetchDeleteBook(id)
        .then((response) => {
          window.location.reload();
          console.log('Book deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting book:', error);
        });
    }
  };
  

  renderBooks = () => {
    return this.state.allBooks.map((book) => (
      <tr key={book._id}>
        <td>{book.author_id.name}</td>
        <td>{book.title}</td>
        <td>{book.language}</td>
        <td>{book.year}</td>
        <td><img src={book.imageLink} alt='not found' /></td>
        
        <td>
          <button className='btn btn-outline-success me-2'><NavLink className="link1" to={`/books/${book._id}`}>View</NavLink></button>

          <button className='btn btn-outline-info me-2'><NavLink className="link1" to={`/updatebook/${book._id}`}> Update</NavLink></button>
          <button className='btn btn-outline-danger me-2' onClick={() => this.handleDeleteBook(book._id)}>Delete</button>
        </td>
      </tr>
    ));
  }
  
  render() {
    return (
      <div className='body'>
         <Sidebar/>
         <div style={{paddingTop: "3%"}}>
          <p className='addBook'><span><NavLink className="link1" to={`/createbook`}>Add Book</NavLink></span></p>
         <table  className="cont">
          <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Language</th>
                <th>Year</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
        </thead>
        <tbody>
        {this.renderBooks()}
        </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default Books;
