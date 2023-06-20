import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate, useNavigate, useParams, NavLink } from 'react-router-dom';
import { fetchmyBooks, updateBookStatus } from '../../api';

export default function UserBooks() {
  const [userBook, setBooks] = useState([]);
  const { id } = useParams();
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    fetchmyBooks(id)
      .then((data) => {
        console.log(data);
        setBooks(data.books);
        setFilteredBooks(data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (statusFilter === '') {
      setFilteredBooks(userBook);
    } else {
      const filteredBooks = userBook.filter((books) => books.statue === statusFilter);
      setFilteredBooks(filteredBooks);
    }
  }, [statusFilter, userBook]);

  const handleStatusChange = (newStatus, bookId) => {
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const userId = decodedToken.sub;
  
    updateBookStatus(bookId, newStatus)
      .then(() => {
        // Refresh the list of books
        fetchmyBooks(userId)
          .then((data) => {
            console.log(data);
            setBooks(data.books);
            setFilteredBooks(data.books);
            setCurrentStatus("");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">All</option>
          <option value="Done">Done</option>
          <option value="WANT_TO_READ">WANT_TO_READ</option>
          <option value="READING">READING</option>
        </select>
      </div>

      {filteredBooks.length > 0 &&
        filteredBooks.map((books) => (
          <div key={books._id}>
            {books.book.map((book) => (
              <div key={book._id}>
                <h2>{book.title}</h2>
                <img src={book.imageLink} alt={book.title} />
                <p>Author: {book.author_id}</p>
                <p>Category: {book.category}</p>
                <p>Description: {book.description}</p>
                <p>Language: {book.language}</p>
                <p>Pages: {book.pages}</p>
                <p>Year: {book.year}</p>
                <a href={book.pdfLink}>Download PDF</a>
                <audio controls>
                  <source src={book.recordLink} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <p>Status: {books.statue}</p>
                {currentStatus !== "" && book._id === currentStatus && (
                  <select value={currentStatus} onChange={(event) => handleStatusChange(event.target.value, book._id)}>
                    <option value="">Select Status</option>
                    <option value="Done">Done</option>
                    <option value="WANT_TO_READ">Want to Read</option>
                    <option value="READING">Reading</option>
                  </select>
                )}else{
                  <button onClick={() => setCurrentStatus(book._id)}>Change Status</button>
                }
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}