import React, { useEffect, useState } from 'react';
import './header.css'
import '../../style.css'
import { NavLink , useNavigate} from "react-router-dom";
import { logout} from '../../auth'
import jwtDecode from 'jwt-decode';
import {fetchuserDetails} from '../../api';


const Header = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false)
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
        console.log(data.subscribed)
        setIsSubscribed(data.subscribed)
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
                        <a href="." className="navbar-brand col-lg-2">
                            <img src="images/main-logo (1).png" alt="Logo"/>
                        </a>
                        <div className='col-lg-2'></div>
                        <div className="collapse navbar-collapse col-md-auto row" id="collapsibleNavbar">
                            <ul className="navbar-nav justify-content-end d-none d-lg-flex">
                                <li className="nav-item col">
                                    <a href="." className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/home`}>Home</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a href="." className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/lists`}>Books</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a href="." className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/allAuthors`}>Authors</NavLink></a>
                                </li>
                                <li className="nav-item col">
                                    <a href="." className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/contact`}>Contact</NavLink></a>
                                </li>
                                 {
                                    !isSubscribed && (
                                   <a href="." className="nav-link"><NavLink className="link2" activeclassname="active2" to={`/checkout`}>Subscribe</NavLink></a>
                                
                                    )
                                }  

                                {user ? (

                                    <li className="nav-item dropdown">
                                        <a href="." className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img
                                            className="userImage"
                                            src={user.image}
                                            alt="UserImage"
                                            />
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                            <li><a  href="." className="dropdown-item">
                                                <NavLink className="link2" activeclassname="active2" to={`/userprofile`}>
                                                Profile
                                                </NavLink>
                                            </a></li>
                                            <li><a href="." className="dropdown-item">
                                                <div onClick={handleLogout} id="logout">Logout</div>
                                            </a></li>
                                        </ul>
                                        </li>
                                )
                                : (
                                    <li className="nav-item col">
                                        <a  href="." className="nav-link">
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
                            <a href="." className="navbar-brand col-lg-2">
                                <img src="images/main-logo (1).png" alt="Logo"/>
                            </a>
                        </div>
                        <ul className='row'>
                            <span className="navbar-toggler" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="navbar-toggler-icon"></span>
                            </span>
                            {user ? (
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li>
                                        <a href="." className="dropdown-item">
                                            <NavLink className="link2" activeclassname="active2" to={`/userprofile`}>
                                            Profile
                                            </NavLink>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="." className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/allBooks`}>Books</NavLink></a>
                                    </li>
                                    <li>
                                        <a href="." className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>Authors</NavLink></a>
                                    </li>
                                    <li>
                                        <a href="." className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/contact`}>Contact</NavLink></a>
                                    </li>
                                    <li><a href="." className="dropdown-item">
                                        <div onClick={handleLogout} id="logout">Logout</div>
                                    </a></li>
                                </ul>
                            )
                            : (
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li>
                                            <a href="." className="dropdown-item">
                                                <NavLink id="loginBtn" className="link2" activeclassname="active2" to={`/login`}>
                                                Login
                                                </NavLink>
                                            </a>
                                    </li>
                                    <li>
                                        <a href="." className="dropdown-item"><NavLink className="link2" activeclassname="active2" to={`/`}>About</NavLink></a>
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

