import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { fetchBooks, fetchAuthors, fetchusers } from '../../api';
import './sidebar.css'
const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    Promise.all([fetchBooks(), fetchAuthors(), fetchusers()])
      .then(([booksData, authorsData, usersData]) => {
        setBooks(booksData);
        setAuthors(authorsData);
        setUsers(usersData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const authorsLength = authors.length;
  const booksLength = books.length;
  const usersLength = users.length;

  return (
    <div className="body">
      <Sidebar />
      <div id="divs" style={{marginLeft:"33%", paddingTop:"3%"}}>   
          <div className="bg-success divv">
            <span className="div-title"><i class="bi bi-people-fill"></i> Users Num</span>
            <p style={{textAlign:"center"}}>{usersLength}</p>
          </div>
          <div className="bg-info divv">
            <span  className="div-title"><i class="bi bi-book"></i> Books Num</span>
            <p style={{textAlign:"center"}}>{booksLength}</p>
          </div>
          <div className="bg-warning divv">
            <span  className="div-title"><i class="bi bi-person-circle"></i> Authors Num</span>
            <p style={{textAlign:"center"}}>{authorsLength}</p>
          </div>
      </div>
    </div>
  );
};

export default DashboardPage;
