import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { fetchBooks, fetchAuthors, fetchusers } from '../../api';

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
    <div className="page">
      <Sidebar />
      <p>{usersLength}</p>
      <p>{booksLength}</p>
      <p>{authorsLength}</p>

      
    </div>
  );
};

export default DashboardPage;
