import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer.js';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails, chooseBook } from "../../api";
import jwtDecode from 'jwt-decode';
import './book_detail.css';
const BookDetail = () => {
	const { id } = useParams();
	const [book, setBook] = useState({});
	const [pdfLink, setPdfLink] = useState("");
	const [statue, setStatue] = useState("");

	const handleStatueChange = (event) => {
		setStatue(event.target.value);
	  };
	
	  useEffect(() => {
		fetchBookDetails(id)
		  .then((data) => {
			setBook(data);
			setPdfLink(data.pdfLink);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }, [id]);
	
	  const handleSubmit = (event) => {
		const token=localStorage.getItem("token");
		if(token){
		  const decodedToken = jwtDecode(token);
		  var userId = decodedToken.userId;
	
		}
		event.preventDefault();
		const user_id = userId; 
		const user_book={ user_id, statue, book_id: id }
		chooseBook(user_book)
		  .then((data) => {
			console.log(data);
		  })
		  .catch((err) => {
			console.log(err);
	
		  });
	  };


return (
    <div className="bookdetail">
      <Header/>
      <div class="bg-sand padding-large">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<a href="." className="product-image"><img src={book.imageLink} alt="notFound"/></a>
			</div>
			<div class="col-md-6 pl-5">
				<div class="product-detail">
					<h1>Birds Gonna Be Happy</h1>
					<p className='fiction'>Fiction</p>
					<span class="price colored">$45.00</span>
                    <br/>
         			<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. 
					</p>
					<p>
						Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<button type="submit" name="add-to-cart" value="27545" class="button">Add to cart</button>
              </div>
			</div>

		</div>
	</div>
</div>





      <Footer />
    </div>
  
  );
};

export default BookDetail;
