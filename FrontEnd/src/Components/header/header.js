import React, { useEffect, useState } from 'react';
import './header.css'
import '../../style.css'
import { NavLink , useNavigate} from "react-router-dom";
import { logout} from '../../auth'
import jwtDecode from 'jwt-decode';
import {fetchuserDetails} from '../../api';


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if(token) return true;
    else return false;
  };

const Header = ({ userId }) => {
    const [user, setUser] = useState(null);
    const token=localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate('/');
      return(false);
    };

    if(token){
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
        console.log(userId);
    }

    useEffect(() => {
        fetchuserDetails(userId)
        .then((data) => {
        setUser(data);
        console.log(data)
        })
        .catch((err) => {
        console.log(err);
        });
    }, [userId]);
    if(!user){console.log(user, "login please")}

        return (
            <header id="header" className='navbar navbar-expand-lg' style={{textAlign:"center"}}>
                <div className='nav-con'>
                    <div className="container row  d-none d-lg-flex">
                        <a className="navbar-brand col-lg-2">
                            <img src="images/main-logo (1).png" alt="Logo"/>
                        </a>
                        <div className='col-lg-2'></div>
                        <div className="collapse navbar-collapse col-md-auto row" id="collapsibleNavbar">
                            <ul className="navbar-nav justify-content-end d-none d-lg-flex">
                                <li className="nav-item col">
                                    <a className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/home`}>Home</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/allBooks`}>Books</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/`}>Authors</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/`}>Contact</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></a>
                                </li>

                                {user ? (

                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img
                                            className="userImage"
                                            src={user.image}
                                            alt="User Image"
                                            />
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            <li><a className="dropdown-item">
                                                <NavLink className="link2" activeclassname="active2" to={`/userprofile`}>
                                                Profile
                                                </NavLink>
                                            </a></li>
                                            <li><a className="dropdown-item">
                                                <div onClick={handleLogout} id="logout">Logout</div>
                                            </a></li>
                                        </ul>
                                        </li>
                                )
                                : (
                                    <li className="nav-item col">
                                        <a className="nav-link">
                                            <NavLink id="loginBtn" className="link2" activeclassname="active2" to={`/login`}>
                                            Login
                                            </NavLink>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>




                    <div className='d-flex d-lg-none container'>
                        <div className='container'>
                            <a className="navbar-brand col-lg-2">
                                <img src="images/main-logo (1).png" alt="Logo"/>
                            </a>
                        </div>
                        <ul className='row'>
                            <button className="navbar-toggler" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {user ? (
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li>
                                        <a className="dropdown-item">
                                            <NavLink className="link2" activeclassname="active2" to={`/userprofile`}>
                                            Profile
                                            </NavLink>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/allBooks`}>Books</NavLink></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Authors</NavLink></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Contact</NavLink></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></a>
                                    </li>
                                    <li><a className="dropdown-item">
                                        <div onClick={handleLogout} id="logout">Logout</div>
                                    </a></li>
                                </ul>
                            )
                            : (
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li>
                                            <a className="dropdown-item">
                                                <NavLink id="loginBtn" className="link2" activeclassname="active2" to={`/login`}>
                                                Login
                                                </NavLink>
                                            </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></a>
                                    </li>
                                </ul>
                            )}
                        </ul>
                    </div>

                </div>
            </header>
        )
    }

export default Header;

