import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchBookData();
  }, [category]);

  const fetchBookData = async () => {
    try {
      const response = await fetchBooks({ category: category });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="romance">Fiction</option>
          <option value="drama">Nonfiction</option>
        </select>
      </div>
      <ul>
        {books.map((book) => (
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

