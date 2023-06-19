import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../api';

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
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author_id.name}</p>
            <p>Category: {book.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
