import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './sidebar';
import { fetchBooks, fetchAuthors, fetchusers } from '../../api';
import './sidebar.css';
import Chart from 'chart.js/auto';

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

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

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Users', 'Books', 'Authors'],
        datasets: [
          {
            label: 'Number of Items',
            data: [usersLength, booksLength, authorsLength],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  }, [usersLength, booksLength, authorsLength]);

  return (
    <div className="body">
      <Sidebar />
      <div id="divs" style={{ marginLeft: '40%', paddingTop: '3%' }}>
        <div className="bg-success divv">
          <span className="div-title">
            <i className="bi bi-people-fill"></i> Users Num
          </span>
          <p style={{ textAlign: 'center' }}>{usersLength}</p>
        </div>
        <div className="bg-info divv">
          <span className="div-title">
            <i className="bi bi-book"></i> Books Num
          </span>
          <p style={{ textAlign: 'center' }}>{booksLength}</p>
        </div>
        <div className="bg-warning divv">
          <span className="div-title">
            <i className="bi bi-person-circle"></i> Authors Num
          </span>
          <p style={{ textAlign: 'center' }}>{authorsLength}</p>
        </div>
      </div>
        <div className='chartDashboard' style={{display:"block"}}>
        <canvas ref={chartRef}></canvas>
        </div>
    </div>
  );
};

export default DashboardPage;
