import React from 'react';
import './header.css'
import '../../style.css'
import { NavLink } from "react-router-dom";
const Header = () => {
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
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Authors</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Articles</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Contact</NavLink></span>
                        <span className="menu-item"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></span>
                        <span className="menu-item ms-4"><NavLink className="link2" activeclassname="active2" to={`/`}>profile</NavLink></span>
                </div>
            </nav>
        </div>
    </div>
</div>
</header>
    )}
export default Header;
