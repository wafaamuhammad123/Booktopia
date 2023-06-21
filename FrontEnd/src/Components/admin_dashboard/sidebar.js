import React from 'react';
import { NavLink ,useNavigate } from "react-router-dom";
import "./sidebar.css"
import '../../style.css'
import { logout} from '../../auth'
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
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
        <p><NavLink className="link" activeclassname="active" to={`/dashboard`}>Dashboard</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/getUsers`}>Users</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/authors`}>Authors</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/books`}>Books</NavLink></p>
        <hr/>
        <button className="logout" onClick={handleLogout}>Logout</button><i className="bi bi-heart-fill"></i>
        </div>
    </div>
  );
};

export default Sidebar;
