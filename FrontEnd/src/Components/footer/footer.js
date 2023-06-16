import React from 'react';
import '../header/header.css'
// import { NavLink } from "react-router-dom";
const Footer = () => {
    return (
<div  id="footer">      
<footer >
	<div className="container">
		<div className="row">
			<div className="col-md-4 col-sm-12">
				<div className="footer-item">
					<div className="company-brand">
						<img src="images/logo_1.png" className="logo" alt="logo"/>
					</div>
				</div>
			</div>
			<div className="col-md-2">
				<div className="footer-menu">
					<h5>About Us</h5>
					<ul className="menu-list">
						<li className="menu-item">
							vision
						</li>
						<li className="menu-item">
							articles
						</li>
						<li className="menu-item">
							careers
                        </li>
						<li className="menu-item">
							service terms
                        </li>
						<li className="menu-item">
							donate
						</li>
					</ul>
				</div>

			</div>
			<div className="col-md-2">

				<div className="footer-menu">
					<h5>Discover</h5>
					<ul className="menu-list">
						<li className="menu-item">
							Home
						</li>
						<li className="menu-item">
							Books
						</li>
						<li className="menu-item">
							Authors
						</li>
						<li className="menu-item">
							Subjects
						</li>
						<li className="menu-item">
							Advanced Search
						</li>
					</ul>
				</div>

			</div>
			<div className="col-md-2">
				<div className="footer-menu">
					<h5>My account</h5>
					<ul className="menu-list">
						<li className="menu-item">
							Sign In
						</li>
						<li className="menu-item">
							View Cart
						</li>
						<li className="menu-item">
							My Wishtlist
						</li>
						<li className="menu-item">
							Track My Order
						</li>
					</ul>
				</div>
			</div>
			<div className="col-md-2">
				<div className="footer-menu">
					<h5>Help</h5>
					<ul className="menu-list">
						<li className="menu-item">
							Help center
						</li>
						<li className="menu-item">
							Report a problem
						</li>
						<li className="menu-item">
							Suggesting edits
						</li>
						<li className="menu-item">
							Contact us
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
<hr/>
<div id="footer-bottom">
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				<div className="copyright">
					<div className="row">
						<div className="col-md-6">
							<p>© 2023 All rights reserved. BookTopia Project </p>
						</div>
						<div className="col-md-4">
							<div className="social-links align-right">
								<ul style={{display:"flex",justifyContent: "space-around" }}>
									<li>
                                        <i className="bi bi-facebook"></i>
									</li>
									<li>
                                        <i className="bi bi-twitter"></i>
									</li>
									<li>
                                        <i className="bi bi-youtube"></i>
									</li>
									<li>
                                        <i className="bi bi-github"></i>
									</li>
                                    <li>
                                        <i className="bi bi-linkedin"></i>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>  
)}
export default Footer;