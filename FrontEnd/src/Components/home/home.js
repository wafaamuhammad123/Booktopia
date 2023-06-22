import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import './home.css';
import { fetchBooks } from '../../api';
// import { fetchAuthors } from '../../api';
// import { NavLink } from 'react-router-dom';
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true, 
  };

const Home = () => {
	const [books, setBooks] = useState([]);
	// const [category, setCategory] = useState('');
	useEffect(() => {
		fetchBookData();
	},[]);
	// console.log(books)


	const fetchBookData = async () => {
	try {
		const response = await fetchBooks();
		setBooks(response);
	} catch (error) {
		console.error('Error fetching books:', error);
	}
	};


	return (
	  <div className="page">
		<Header />
		<div className='container' style={{width:"100%"}}>
			<img src='images/tree.png'/>
			<div id="quotation" class="align-center" style={{position: "absolute", top: "45%", left: "50%",width:"90%", transform: "translate(-50%, -50%)"}}>
				<div class="inner-content">
					<h2 class="section-title divider">Plant knowledge trees</h2>
				</div>
			</div>
		</div><br/>

		<div className="container" id="billboard">
			<Slider className='slide' {...settings}>
				<div className='slider-item row'>
					<div class="carddd">
						<img src="images/main-banner1.jpg" alt="Image"/>
						<div class="card-content" style={{textAlign:"center", width:"70%", marginLeft:"15%", marginRight:"15%", marginTop:"10%"}}>
							<h2 className="banner-title">Life of the Wild</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.</p>
							<div className="btn-wrap">Read More<i className="bi bi-arrow-right"></i></div>
						</div>
					</div>
				</div>
				<div className='slider-item'>
					<div class="carddd">
						<img src="images/main-banner2.jpg" alt="Image"/>
						<div class="card-content" style={{textAlign:"center", width:"70%", marginLeft:"15%", marginRight:"15%", marginTop:"10%"}}>
							<h2 className="banner-title">Birds gonna be Happy</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.</p>
							<div className="btn-wrap">Read More<i className="bi bi-arrow-right"></i></div>
						</div>
					</div>
				</div>
				</Slider>
		</div>
	
<div id="client-holder" data-aos="fade-up">
	<div class="container" style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
		<div class="row">
			<div class="inner-content">
				<div class="logo-wrap">
					<div class="grid">
						<img className='col' style={{width:"20%"}} src="images/client-image1.png" alt="client"/>
						<img className='col' style={{width:"20%"}} src="images/client-image2.png" alt="client"/>
						<img className='col' style={{width:"20%"}} src="images/client-image3.png" alt="client"/>
						<img className='col' style={{width:"20%"}} src="images/client-image4.png" alt="client"/>
						<img className='col' style={{width:"20%"}} src="images/client-image5.png" alt="client"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="featured-books">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

			<div class="section-header align-center">
				<div class="title">
					<span>Some quality items</span>
				</div>
				<h2 class="section-title">Featured Books</h2>
			</div>

			<div class="product-list" data-aos="fade-up">
				
				{books.length!=0 ? (
					<div class="row">
					<div class="col-md-3">
						<figure class="product-style">
							<img src={books[2].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Favourites</button>
							<figcaption>
								<h3>{books[2].title}</h3>
								<p>{books[2].author_id.name}</p>
								<div class="item-price">$ 40.00</div>
							</figcaption>
						</figure>
					</div>
				
					<div class="col-md-3">
						<figure class="product-style">
							<img src={books[5].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Favourites</button>
							<figcaption>
								<h3>{books[5].title}</h3>
								<p>{books[5].author_id.name}</p>
								<div class="item-price">$ 38.00</div>
							</figcaption>
						</figure>
					</div>

					<div class="col-md-3">
						<figure class="product-style">
							<img src={books[7].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Favourites</button>
							<figcaption>
								<h3>{books[7].title}</h3>
								<p>{books[7].author_id.name}</p>
								<div class="item-price">$ 45.00</div>
							</figcaption>
						</figure>
					</div>
									
					<div class="col-md-3">
						<figure class="product-style">
							<img src={books[8].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Favourites</button>
							<figcaption>
								<h3>{books[8].title}</h3>
								<p>{books[8].author_id.name}</p>
								<div class="item-price">$ 35.00</div>
							</figcaption>
						</figure>
					</div></div>):(
						<div class="row">NO Books</div>
					)}			
			</div>


			</div>
		</div>
	</div>
</div>

<div id="best-selling" class="leaf-pattern-overlay">
	<div class="container">
				<div class="row" style={{justifyContent:"center", alignItems:"center", width:"90%", marginLeft:"0%", marginRight:"10%"}}>

					<div class="col-md-6">
						<figure class="products-thumb">
							<img src="images/single-image.jpg" alt="book" class="single-image"/>
						</figure>	
					</div>

					<div class="col-md-6">
						<div class="product-entry">
							<h2 class="section-title divider">Best Selling Book</h2>

							<div class="products-content">
								<div class="author-name">By Timbur Hood</div>
								<h3 class="item-title">Birds gonna be happy</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.</p>
								<div class="item-price">$ 45.00</div>
								<div class="btn-wrap">
									<a href="#" class="btn-accent-arrow">shop it now <i class="icon icon-ns-arrow-right"></i></a>
								</div>
							</div>
						</div>
					</div>
			
		</div>
	</div>
</div>




<div id="popular-books" class="bookshelf">
	<div class="container">
	<div class="row">
		<div class="col-md-12">

			<div class="section-header align-center">
				<div class="title">
					<span>Some quality items</span>
				</div>
				<h2 class="section-title">Popular Books</h2>
			</div>
   
			{/* <ul class="tabs">
			  <li data-tab-target="#all-genre" class="active tab">All Genre</li>
			  <li data-tab-target="#business" class="tab">Business</li>
			  <li data-tab-target="#technology" class="tab">Technology</li>
			  <li data-tab-target="#romantic" class="tab">Romantic</li>
			  <li data-tab-target="#adventure" class="tab">Adventure</li>
			  <li data-tab-target="#fictional" class="tab">Fictional</li>
			</ul> */}
			{books.length!=0 ? (
			<div class="tab-content">
			  	<div id="all-genre" data-tab-content class="active">
					<div class="row">

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[2].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[2].title}</h3>
									<p>{books[2].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[4].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[4].title}</h3>
									<p>{books[4].author_id.name}</p>
									<div class="item-price">$ 35.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[5].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[5].title}</h3>
									<p>{books[5].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[6].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[6].title}</h3>
									<p>{books[6].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

					</div>
					<div class="row">

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[7].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[7].title}</h3>
									<p>{books[7].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[8].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[8].title}</h3>
									<p>{books[8].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[9].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[9].title}</h3>
									<p>{books[9].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src={books[10].imageLink} alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>{books[10].title}</h3>
									<p>{books[10].author_id.name}</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

					</div>

			  	</div>
				{/* <div id="business" data-tab-content>
					<div class="row">
						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item2.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Peaceful Enlightment</h3>
									<p>Marmik Lama</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item4.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Great travel at desert</h3>
									<p>Sanchit Howdy</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item6.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Life among the pirates</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item8.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Simple way of piece life</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

					</div>
			  	</div>

				<div id="technology" data-tab-content>
					<div class="row">
						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item1.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Peaceful Enlightment</h3>
									<p>Marmik Lama</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item3.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Great travel at desert</h3>
									<p>Sanchit Howdy</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item5.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Life among the pirates</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item7.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Simple way of piece life</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>
					</div>
			  	</div>

				<div id="romantic" data-tab-content>
					<div class="row">
					<div class="col-md-3">
						<figure class="product-style">
								<img src="images/tab-item1.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Peaceful Enlightment</h3>
									<p>Marmik Lama</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item3.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Great travel at desert</h3>
									<p>Sanchit Howdy</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item5.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Life among the pirates</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item7.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Simple way of piece life</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>

				<div id="adventure" data-tab-content>
					<div class="row">
						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item5.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Life among the pirates</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item7.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Simple way of piece life</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>

				<div id="fictional" data-tab-content>
					<div class="row">
						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item5.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Life among the pirates</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>

						<div class="col-md-3">
							<figure class="product-style">
								<img src="images/tab-item7.jpg" alt="Books" class="product-item"/>
								<button type="button" class="add-to-cart" data-product-tile="add-to-cart">Add to Cart</button>
								<figcaption>
									<h3>Simple way of piece life</h3>
									<p>Armor Ramsey</p>
									<div class="item-price">$ 40.00</div>
								</figcaption>
							</figure>
						</div>
					</div>
				</div> */}

			</div>):(<div class="row">NO Books</div>)}

		</div>
			
		</div>
	</div>
</div>

<div id="quotation" class="align-center">
	<div class="inner-content">
		<h2 class="section-title divider">Quote of the day</h2>
		<blockquote data-aos="fade-up">
			<q>“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”</q>
			<div class="author-name">Dr. Seuss</div>			
		</blockquote>
	</div>		
</div>

<div id="subscribe">
	<div class="container">
		<div class="row">

			<div style={{width:"85%", marginRight:"10%", marginLeft:"5%"}}>
				<div class="row">

					<div class="col-md-6">

						<div class="title-element">
							<h2 class="section-title divider">Subscribe to our newsletter</h2>
						</div>

					</div>
					<div class="col-md-6">

						<div class="subscribe-content" data-aos="fade-up">
							<p>Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet, consectetur. Elit adipiscing enim pharetra hac.</p>
							<form id="form">
								<input type="text" name="email" placeholder="Enter your email addresss here"/>
								<button class="btn-subscribe">
									<span>send</span> 
									<i class="icon icon-send"></i>
								</button>
							</form>
						</div>

					</div>
					
				</div>
			</div>
			
		</div>
	</div>
</div>

<div id="latest-blog">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<div class="section-header align-center">
					<div class="title">
						<span>Read our articles</span>
					</div>
					<h2 class="section-title">Latest Articles</h2>
				</div>

				<div class="row">

					<div class="col-md-4">

						<article class="column" data-aos="fade-up">

							<figure>
								<a href="#" class="image-hvr-effect">
									<img src="images/post-img1.jpg" alt="post" class="post-image"/>			
								</a>
							</figure>

							<div class="post-item">	
								<div class="meta-date">Mar 30, 2021</div>			
							    <h3><a href="#">Reading books always makes the moments happy</a></h3>

							    <div class="links-element">
								    <div class="categories">inspiration</div>
								    <div class="social-links">
										<ul>
											<li>
												<a href="#"><i class="icon icon-facebook"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-twitter"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-behance-square"></i></a>
											</li>
										</ul>
									</div>
								</div>

							</div>
						</article>
						
					</div>
					<div class="col-md-4">

						<article class="column" data-aos="fade-down">
							<figure>
								<a href="#" class="image-hvr-effect">
									<img src="images/post-img2.jpg" alt="post" class="post-image"/>
								</a>
							</figure>
							<div class="post-item">	
								<div class="meta-date">Mar 29, 2021</div>			
							    <h3><a href="#">Reading books always makes the moments happy</a></h3>

							    <div class="links-element">
								    <div class="categories">inspiration</div>
								    <div class="social-links">
										<ul>
											<li>
												<a href="#"><i class="icon icon-facebook"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-twitter"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-behance-square"></i></a>
											</li>
										</ul>
									</div>
								</div>

							</div>
						</article>
						
					</div>
					<div class="col-md-4">

						<article class="column" data-aos="fade-up">
							<figure>
								<a href="#" class="image-hvr-effect">
									<img src="images/post-img3.jpg" alt="post" class="post-image"/>
								</a>
							</figure>
							<div class="post-item">		
								<div class="meta-date">Feb 27, 2021</div>			
							    <h3><a href="#">Reading books always makes the moments happy</a></h3>

							    <div class="links-element">
								    <div class="categories">inspiration</div>
								    <div class="social-links">
										<ul>
											<li>
												<a href="#"><i class="icon icon-facebook"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-twitter"></i></a>
											</li>
											<li>
												<a href="#"><i class="icon icon-behance-square"></i></a>
											</li>
										</ul>
									</div>
								</div>

							</div>
						</article>
						
					</div>

				</div>

				<div class="row">

					<div class="btn-wrap align-center">
						<a href="#" class="btn btn-outline-accent btn-accent-arrow" tabindex="0">Read All Articles<i class="icon icon-ns-arrow-right"></i></a>
					</div>
				</div>

			</div>	
		</div>
	</div>
</div>


      <Footer />
     </div> 
      
  );
};

export default Home;