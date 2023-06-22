import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate, useNavigate, useParams, NavLink } from 'react-router-dom';
import { fetchmyBooks, updateBookStatus,fetchAuthor} from '../../api';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import './userBooks.css';

export default function UserBooks() {
  const [userBook, setBooks] = useState([]);
  const { id } = useParams();
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [author, setAuthor]= useState({});

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
 useEffect(()=>{
  if (currentStatus === ''){
    setCurrentStatus(currentStatus);
  }else{
    setCurrentStatus(currentStatus);
  }
 });
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
      <Header />
      <div className='userbookPage'>
      <div className='sideNav'>
        
        {/* <select id="status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}> */}
        <span className="statueBtn" onClick={() => setStatusFilter('')}>All</span>
          <span className="statueBtn" onClick={() => setStatusFilter('READING')}>READING</span>
          <span className="statueBtn" onClick={() => setStatusFilter('Done')}>Done</span>
          <span className="statueBtn" onClick={() => setStatusFilter('WANT_TO_READ')}>WANT_TO_READ</span>
      </div>
      <div className='userBooks'>
      {filteredBooks.length > 0 &&
        filteredBooks.map((books) => (
          <div key={books._id}  >
            {books.book.map((book) => (
              <div key={book._id} className='userCard'>
                <h2>{book.title}</h2>
                <NavLink to={`/userbookdetails/${book._id}`}>
                <img src={book.imageLink} alt={book.title} />
                </NavLink>
                <p>Category: {book.category}</p>
                <p>Description: {book.description}</p>
                <p>Language: {book.language}</p>
                <p>Pages: {book.pages}</p>
                <p>Year: {book.year}</p>    
              </div>
            ))}
            </div>
          
        ))}
        </div>
        </div>
        <Footer />
    </div>
  );
}