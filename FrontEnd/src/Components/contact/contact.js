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
					<span class="item1"><a href="index.html">Home /</a></span>
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
							<br/>
					<p>
					+1650-243-0000
					</p>
					<p>
					North Melbourne VIC 3051, Australia
					</p>
						
						</ul>
					</div>
					

				</div>
			</div>

			

			<div class="col-md-6 p-0">
				
				<div class="contact-information"  style={{marginLeft: '5em'}}>
					<h2>Send A Message</h2>
					<form name="contactform" action="contact.php" method="post" class="contact-form d-flex flex-wrap mt-4">
						<div class="row">
					    	<div class="col-md-6">
								<input type="text" minlength="2" name="name" placeholder="Name" class="name" required/>
							</div>
							<div class="col-md-6">
								<input type="email" name="email" placeholder="E-mail" class="email" required/>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">

								<textarea class="u-full-width" name="message" placeholder="Message" style={{height: '10em',marginTop:'2em',width:'35em'}} required></textarea>


								<button  type="submit" name="submit"className="my-button">Submit</button>
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
