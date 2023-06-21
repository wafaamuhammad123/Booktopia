import React from 'react';
import './header.css'
import '../../style.css'
import { NavLink , useNavigate} from "react-router-dom";
import { logout} from '../../auth'
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if(token) return true;
    else return false;
  };

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate('/');
    };
    return (
<header id="header">
<div className="container">
    <div className="row">
        <div className="col-md-2">
            <div className="main-logo">
                <img src="images/main-logo.png" alt="logo_1" />
            </div>
        </div>
        <div className="offset-2 col-md-8">
            <nav id="navbar">
                <div className="main-menu">
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/home`}>Home</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/lists`}>Books</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Authors</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Contact</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></span>
                        {isAuthenticated() ? (
                        <span className="menu-item ">
                            <div>
                            <NavLink className="link2" activeclassname="active2" to={`/userprofile`}>
                            Profile
                            </NavLink>
                            <div style={{display:"inline"}} onClick={handleLogout} className='ms-5 ' id="logout">Logout</div>
                            </div>
                        </span>
                        ) : (
                        <span className="menu-item ms-4">
                            <NavLink id="loginBtn" activeclassname="active2" to={`/login`}>
                            Login
                            </NavLink>
                        </span>
                        )}
                       
                </div>
            </nav>
        </div>
    </div>
</div>
</header>
    )}
export default Header;
