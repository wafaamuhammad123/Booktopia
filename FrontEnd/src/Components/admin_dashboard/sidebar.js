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
        <p><NavLink className="link" activeclassname="active" to={`/dashboard`}><i class="bi bi-amd"></i> Dashboard</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/getUsers`}><i class="bi bi-person-bounding-box"></i> Users</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/authors`}> <i class="bi bi-person-circle"></i> Authors</NavLink></p>
        <hr/>
        <p><NavLink className="link" activeclassname="active" to={`/books`}><i class="bi bi-book-half"></i> Books</NavLink></p>
        <hr/>
        <button class="Btn logout"  onClick={handleLogout}>
            <div className="sign"><i class="bi bi-arrow-right-circle-fill"></i></div>
            <div className="text" >Logout</div>
        </button>
        </div>
    </div>
  );
};

export default Sidebar;
