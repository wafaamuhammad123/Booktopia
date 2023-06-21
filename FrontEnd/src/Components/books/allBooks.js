import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../api';
import './allBooks.css';
import { NavLink } from 'react-router-dom';

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

  // Filter the books based on the selected category and search query
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
      <h2>Book List</h2>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="drama">Drama</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={searchQuery} onChange={handleSearchChange} />
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
              <h3>{book.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
