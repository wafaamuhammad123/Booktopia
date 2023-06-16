import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer.js' 
import './home.css'
const Home = () => {
  return (
    <div className="page">
      <Header />
      <div id="billboard">
	  <div className="container">
		<div className="row">
			<div className="col-md-12">
	 	    <button className="prev slick-arrow">
					<i className="bi bi-arrow-left"></i>
				</button>
				<div className="main-slider pattern-overlay">
					<div className="slider-item">
						<div className="banner-content">
							<h2 className="banner-title">Life of the Wild</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.</p>
							<div className="btn-wrap">Read More<i className="bi bi-arrow-right"></i>
							</div>
						</div>
						<img src="images/main-banner1.jpg" alt="banner" className="banner-image" />
					</div>
					<div className="slider-item">
						<div className="banner-content">
							<h2 className="banner-title">Birds gonna be Happy</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.</p>
							<div className="btn-wrap">Read More<i className="bi bi-arrow-right"></i>
							</div>
						</div>
						<img src="images/main-banner2.jpg" alt="banner" className="banner-image" />
					</div>
				</div>
				<button className="next slick-arrow">
					<i className="bi bi-arrow-right"></i>
				</button>
     		</div>
		</div>
	</div>
    </div>
      <Footer />
     </div> 
      
  );
};

export default Home;