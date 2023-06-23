import React from 'react';
import '../header/header.css'
const Footer = () => {
    return (
<div  id="footer">      
<footer >
	<div className="container">
		<div className="row container row-cols-2 row-cols-md-6" style={{widows:"90%", marginRight:"5%", marginLeft:"5%"}}>
			<div className="col" id='footer-logo' style={{ textAlign: "center"}}>
				<div className="footer-item">
					<div className="company-brand">
						<img src={process.env.PUBLIC_URL + "images/logo_1.png"} className="logo" alt="logo"/>
						
					</div>
				</div>
			</div>
			<div className="col footer-size" style={{marginTop:"35px"}}>
				<div className="footer-menu">
					<h5>About Us</h5>
					<h6>Vision</h6><br/>
					<h6>Articles</h6><br/>
					<h6>Service terms</h6>
				</div>

			</div>
			<div className="col footer-size">

				<div className="footer-menu">
					<h5 style={{marginTop:"35px"}}>Discover</h5>
					<h6>Home</h6><br/>
					<h6>Books</h6><br/>
					<h6>Authors terms</h6>

				</div>

			</div>
			<div className="col footer-size">
				<div className="footer-menu">
					<h5 style={{marginTop:"35px"}}>My account</h5>
					<h6>Sign In</h6><br/>
					<h6>View Cart</h6><br/>
					<h6>My Wishlist</h6>

				</div>
			</div>
			<div className="col footer-size">
				<div className="footer-menu">
					<h5 style={{marginTop:"35px"}}>Help center</h5>
					<h6>Report a problem</h6><br/>
					<h6>Suggesting edits</h6><br/>
					<h6>Contact us</h6>
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