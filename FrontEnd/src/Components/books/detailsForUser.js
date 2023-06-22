import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails, chooseBook, fetchuserDetails } from "../../api";
import jwtDecode from 'jwt-decode';
import './details.css'
import Header from '../header/header';
import Footer from '../footer/footer.js';

function UserBookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});
  const [statue, setStatue] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleStatueChange = (event) => {
    setStatue(event.target.value);
    saveStatue(event.target.value);
  };

  const saveStatue = (selectedStatue) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      var userId = decodedToken.userId;
    }
    const user_id = userId;

    const user_book = { user_id, statue: selectedStatue, book_id: id }
    chooseBook(user_book)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      var userId = decodedToken.userId;
      fetchuserDetails(userId)
        .then((data) => {
          setUser(data);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchBookDetails(id)
      .then((data) => {
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      });

    const userSubscribed = user.subscribed; // Replace with actual logic to determine user subscription status
    setSubscribed(userSubscribed);
  }, [id]);

  const handleReadOnline = () => {
    if (subscribed) {
      window.open(book.pdfLink, "_blank");
    } else {
      alert("Please subscribe to access the book.");
    }
  };

  return (
    <div className="container">
      <Header />
      <div class="row">
        <div class="offset-1 col-md-5">
          <img id="image2" src={book.imageLink} alt="notFound" />
        </div>
        <div class="ms-4 mt-3 col-md-4">
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Title: </span>
            {book.title}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Year: </span>
            {book.year}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Language: </span>
            {book.language}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Description: </span>
            {book.description}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Pages: </span>
            {book.pages}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Category: </span>
            {book.category}
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">Video: </span>
            <a href={book.recordLink} target="_blank" rel="noopener noreferrer"> Video</a>
          </span>
          <span style={{ display: "block", padding: "5px 0px" }}>
            <span className="book1">PDF: </span>
            <a href={book.pdfLink} target="_blank" rel="noopener noreferrer" onClick={handleReadOnline}>Read Online</a>
          </span>
          <div>
            <span className="book1" htmlFor="status">Status:</span>
            <select id="status" name="status" value={statue} onChange={handleStatueChange}>
              <option value="">--Select Status--</option>
              <option value="READING">READING</option>
              <option value="Done">Done</option>
              <option value="WANT_TO_READ">WANT_TO_READ</option>
            </select>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserBookDetails;
