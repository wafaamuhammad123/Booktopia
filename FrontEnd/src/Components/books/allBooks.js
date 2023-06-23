import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../api';
import './allBooks.css';
import { NavLink } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer.js';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookData();
  }, [category]);

  const fetchBookData = async () => {
    try {
      const response = await fetchBooks({ category: category });
      setBooks(response);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = category
    ? books.filter(
        (book) =>
          book.category === category &&
          (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author_id.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author_id.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div>
      <Header />
      <div className="filter">
      <div className="btns">
          <span className="categortBtn" onClick={() => setCategory('')}>All</span>
          <span className="categortBtn" onClick={() => setCategory('romance')}>Romance</span>
          <span className="categortBtn" onClick={() => setCategory('drama')}>Drama</span>
          <span className="categortBtn" onClick={() => setCategory('autobiography')}>Autobiography</span>
          <span className="categortBtn" onClick={() => setCategory('philosophy')}>Philosophy</span>
          <span className="categortBtn" onClick={() => setCategory('realism')}>Realism</span>
      </div>
      <div className='search'>
        <input type="text" id="search" placeholder="search the book you want..." value={searchQuery} onChange={handleSearchChange} />
      </div>
      </div>
      <div className="books">
        {filteredBooks.map((book) => (
          <div className="card" key={book._id}>
            <NavLink to={`/userbookdetails/${book._id}`}>
            <div className="card-image">
              <img src={book.imageLink} alt={book.title} />
            </div>
            </NavLink>
            <div className="card-title">
              <h3><i class="bi bi-book-half me-1" style={{color:"#5A96E3"}} ></i>{book.title.toUpperCase()}</h3>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BookList;
