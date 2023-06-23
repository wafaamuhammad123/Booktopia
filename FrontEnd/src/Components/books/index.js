import React, { Component } from 'react';
import { fetchBooks } from "../../api";
import { fetchDeleteBook } from '../../api';
import Sidebar from '../admin_dashboard/sidebar';
import './index.css' 
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 1,
      booksPerPage: 10,
      showModal: false, 
      deleteBookId: null, 
    };
  }
  
  componentDidMount() {
    this.fetchBooksData();
  }

  handleDeleteBook = (id) => {
    this.setState({ showModal: true, deleteBookId: id });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, deleteBookId: null });
  };
  
  
  fetchBooksData = () => {
    const { currentPage, booksPerPage } = this.state;
    const startIndex = (currentPage - 1) * booksPerPage;
      fetchBooks(startIndex, booksPerPage)
      .then((data) => {
        this.setState({ allBooks: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleDeleteConfirmed = (id) => {
    fetchDeleteBook(id)
      .then((response) => {
        this.fetchBooksData();
        console.log('Book deleted successfully');
        this.handleCloseModal(); 
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };
  

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.fetchBooksData();
    });
  };

  renderBooks = () => {
    const { allBooks, currentPage, booksPerPage } = this.state;
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToRender = allBooks.slice(startIndex, endIndex);
  
    return booksToRender.map((book) => (
      <tr key={book._id}>
        <td>{book.author_id.name}</td>
        <td>{book.title}</td>
        <td>{book.language}</td>
        <td>{book.year}</td>
        <td><img id="image" src={book.imageLink} alt='not found' /></td>
          
        <td>
          <button className='btn btn-outline-success me-2'><NavLink className="link1" to={`/books/${book._id}`}>View</NavLink></button>
          <button className='btn btn-outline-info me-2'><NavLink className="link1" to={`/updatebook/${book._id}`}> Update</NavLink></button>
          <button className='btn btn-outline-danger me-2' onClick={() => this.handleDeleteBook(book._id)}>Delete</button>
        </td>
      </tr>
    ));
  }
  
  
  render() {
    const { allBooks, currentPage, booksPerPage } = this.state;
    const totalBooks = allBooks.length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    return (
      <div className='body'>
         <Sidebar/>
         <div style={{paddingTop: "3%", paddingBottom: "3%"}}>
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
        <div className="pagination w-25" id="buttons">
          <button
            className="pagination-btn"
            onClick={() => this.handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => this.handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => this.handleDeleteConfirmed(this.state.deleteBookId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default Books;
