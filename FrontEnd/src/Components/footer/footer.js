import React from 'react';
import '../header/header.css'
// import { NavLink } from "react-router-dom";
const Footer = () => {
    return (
<div  id="footer">      
<footer >
	<div className="container">
		<div className="row container row-cols-2 row-cols-md-6" style={{widows:"90%", marginRight:"5%", marginLeft:"5%"}}>
			<div className="col" id='footer-logo' style={{ textAlign: "center"}}>
				<div className="footer-item">
					<div className="company-brand">
						<img src="images/logo_1.png" className="logo" alt="logo"/>
					</div>
				</div>
			</div>
			<div className="col footer-size" style={{marginTop:"35px"}}>
				<div className="footer-menu">
					<h5 style={{fontSize:"18px", fontWeight:"bold"}}>About Us</h5>
					<h7>Vision</h7><br/>
					<h7>Articles</h7><br/>
					<h7>Service terms</h7>
				</div>

			</div>
			<div className="col footer-size">

				<div className="footer-menu">
					<h5 style={{marginTop:"35px", fontSize:"18px", fontWeight:"bold"}}>Discover</h5>
					<h7>Home</h7><br/>
					<h7>Books</h7><br/>
					<h7>Authors terms</h7>
				</div>

			</div>
			<div className="col footer-size">
				<div className="footer-menu">
					<h5 style={{marginTop:"35px", fontSize:"18px", fontWeight:"bold"}}>My account</h5>
					<h7>Sign In</h7><br/>
					<h7>View Cart</h7><br/>
					<h7>My Wishlist</h7>
				</div>
			</div>
			<div className="col footer-size">
				<div className="footer-menu">
					<h5 style={{marginTop:"35px", fontSize:"18px", fontWeight:"bold"}}>Help center</h5>
					<h7>Report a problem</h7><br/>
					<h7>Suggesting edits</h7><br/>
					<h7>Contact us</h7>
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
							<div className="social-links align-left" style={{marginLeft:"45%"}}>
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