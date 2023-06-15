import React from 'react';
import { NavLink } from "react-router-dom";
import "./sidebar.css"
import '../../style.css'
const Sidebar = () => {
  return (
    <div className="fixed-sidebar">
        <div>
            <h2 className='title'>BookTopia</h2>
        </div>
        <hr/>
        <div className="user">
        <img src="" alt="" />
        </div>
        <div className="dashboard">
        <p><NavLink className="link" activeClassName="active" to={`/dashboard`}>Dashboard</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeClassName="active" to={`/users`}>Users</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeClassName="active" to={`/authors`}>Authors</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeClassName="active" to={`/books`}>Books</NavLink></p>
        <hr/>
        <button className="logout">Logout</button><i className="bi bi-heart-fill"></i>
        </div>
    </div>
  );
};

export default Sidebar;
