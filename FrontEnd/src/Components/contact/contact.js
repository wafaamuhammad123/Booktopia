import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import './contact.css';
const Contact = () => {
  return (
    <div className="contact">
      <Header />

      
<div>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h1 class="page-title">Contact us</h1>
				<div class="breadcrumbs">
					<span class="item"><a href="index.html">Home /</a></span>
					<span class="item">Contact us</span>
				</div>
			</div>
		</div>
	</div>
</div>



<div class="contact-information padding-large mt-3">
	<div class="container">
		<div class="row">
			<div class="col-md-6 p-0 mb-3">
				
				<h2>Get in Touch</h2>

				<div class="contact-detail d-flex flex-wrap mt-4">
					<div class="detail mr-6 mb-4">
						<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<ul class="list-unstyled list-icon">
							<li><i class="icon icon-phone"></i>+1650-243-0000</li>
							<li><i class="icon icon-envelope-o"></i><a href="mailto:info@yourcompany.com">info@yourcompany.com</a></li>
							<li><i class="icon icon-location2"></i>North Melbourne VIC 3051, Australia</li>
						</ul>
					</div>
					<div class="detail mb-4">
						<h3>Social Links</h3>
						<div class="social-links flex-container">
							<a href="#" class="icon icon-facebook"></a>
							<a href="#" class="icon icon-twitter"></a>
							<a href="#" class="icon icon-pinterest-p"></a>
							<a href="#" class="icon icon-youtube"></a>
							<a href="#" class="icon icon-linkedin"></a>
						</div>
					</div>

				</div>
			</div>

			<div class="col-md-6 p-0">
				
				<div class="contact-information">
					<h2>Send A Message</h2>
					<form name="contactform" action="contact.php" method="post" class="contact-form d-flex flex-wrap mt-4">
						<div class="row">
					    	<div class="col-md-6">
								<input type="text" minlength="2" name="name" placeholder="Name" class="u-full-width" required/>
							</div>
							<div class="col-md-6">
								<input type="email" name="email" placeholder="E-mail" class="u-full-width" required/>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">

								<textarea class="u-full-width" name="message" placeholder="Message" style={{height: '1em'}} required></textarea>

								<label>
								    <input type="checkbox" required/>
								    <span class="label-body">I agree all the <a href="#">terms and conditions</a></span>
								</label>

								<button type="submit" name="submit" class="btn btn-full btn-rounded">Submit</button>
							</div>
						</div>
					</form>

				</div>

			</div>

		</div>
	</div>
</div>

<div class="google-map">
	<div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://getasearch.com/fmovies"></a><br/>
    <a href="https://www.embedgooglemap.net">embedgooglemap.net</a></div></div>
</div>


      <Footer />
    </div>
  
  );
};

export default Contact;
