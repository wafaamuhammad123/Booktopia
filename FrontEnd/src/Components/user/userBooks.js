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
  const [treeImg, setTreeImg] = useState('/images/00-removebg-preview.png');
  const [treeMsg, setTreeMsg] = useState('You have not read any book yet. Start planting your first knowledge tree now.');

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

    var done0=0
    var want0=0
    var read0=0;
    var mostOne=' ';

    if(userBook.length>0){
      mostOne = 'Done';
      for(let i=0; i<userBook.length; i++){
        if(userBook[i].statue == 'Done'){
          done0++;
        }else if(userBook[i].statue == 'READING'){
          read0++;
        }else if(userBook[i].statue == 'WANT_TO_READ'){
          want0++;
        }
      }
      if(done0<read0){
        mostOne = 'READING';
      }
      if(read0<want0){
        mostOne = 'WANT_TO_READ';
      }
    
      if(statusFilter == ''){
        switch(mostOne){
          case ' ':
            setTreeImg('/images/00-removebg-preview.png');
            setTreeMsg('You have not read any book yet. Start planting your first knowledge tree now.');
            break;
          case 'READING':
            setTreeImg('/images/222-removebg-preview.png');
            setTreeMsg('The books you are reading now are the most. Keep taking care of your small trees until they grow.');
            break;
          case 'Done':
            setTreeImg('/images/33-removebg-preview.png');
            setTreeMsg('You are the best, the books you have finished are the most among your books. Keep increasing the number of your trees.');
            break;
          case 'WANT_TO_READ':
            setTreeImg('/images/111-removebg-preview.png');
            setTreeMsg('The books you want to read are the most among your books. Do not leave your seeds without care for too long.');
            break;
        }
      }else{
        switch (statusFilter) {
          case 'READING':
            setTreeImg('/images/222-removebg-preview.png');
            setTreeMsg('You can do it. Keep going until your tree grows.');
            break;
          case 'Done':
            setTreeImg('/images/33-removebg-preview.png');
            setTreeMsg('Great, your trees have grown. Do not stop planting many more trees.');
            break;
          case 'WANT_TO_READ':
            setTreeImg('/images/111-removebg-preview.png');
            setTreeMsg('These seeds are waiting for you, do not leave them for too long.');
            break;
        }
      }
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
      <div className='sideNav'><br/><br/>
        <span className="statueBtn" onClick={() => setStatusFilter('')}>All</span>
          <span className="statueBtn" onClick={() => setStatusFilter('READING')}>READING</span>
          <span className="statueBtn" onClick={() => setStatusFilter('Done')}>Done</span>
          <span className="statueBtn" onClick={() => setStatusFilter('WANT_TO_READ')}>WANT TO READ</span>
          <br/>
          <img src={treeImg} style={{width:"100%", height:"350px"}}/>
      </div>
      
      <div style={{width:"100%"}}><br/><br/>
      <div className='row'>
        <p style={{textAlign:"center", fontSize:"20px", width:"60%", marginLeft:"20%", color:"#C5A992", fontFamily:"cursive", fontWeight:"bold"}}>{treeMsg}</p>
      </div><br/><br/>
      <div className='row'>
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
        </div>
        </div><br/><br/>
        <Footer />
    </div>
  );
}