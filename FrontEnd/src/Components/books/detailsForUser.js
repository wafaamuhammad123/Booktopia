import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails, chooseBook } from "../../api";
import jwtDecode from 'jwt-decode';
// import './details.css'

function UserBookDetails() {
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
    const user_id = userId; // replace with actual user id
    const user_book={ user_id, statue, book_id: id }
    chooseBook(user_book)
      .then((data) => {
        console.log(data);
        // show success message or redirect to another page
      })
      .catch((err) => {
        console.log(err);
        // show error message
      });
  };

  return (
    <div >
      <div style={{ paddingTop: "3%" }}>
        <form onSubmit={handleSubmit}>
          <img src="" alt="" />
          <img src={book.imageLink} alt="notFound" style={{height:"200px", width:"80%", marginLeft:"10%", padding:"15px" }}/>
          <p>
            <span className="book">Title: </span>
            {book.title}
          </p>
          <p>
            <span className="book">Year: </span>
            {book.year}
          </p>
          <p>
            <span className="book">Language: </span>
            {book.language}
          </p>
          <p>
            <span className="book">Description: </span>
            {book.description}
          </p>
          <p>
            <span className="book">Pages: </span>
            {book.pages}
          </p>
          <p>
            <span className="book">Category: </span>
            {book.category}
          </p>
          <p>
          <span className="book">Video: </span>
          <a href={book.recordLink} target="_blank" rel="noopener noreferrer"> Video</a>
          </p>
          <p>
          <span className="book">Video: </span>
          <a href={book.pdfLink} target="_blank" rel="noopener noreferrer"> Read Online</a>
          </p>

          <div>
      <label htmlFor="status">Status:</label>
      <select id="status" name="status" value={statue} onChange={handleStatueChange}>
        <option value="">--Select Status--</option>
        <option value="READING">READING</option>
        <option value="Done">Done</option>
        <option value="WANT_TO_READ">WANT_TO_READ</option>
      </select>
    </div>
          <button type="submit">Save</button>

        </form>
      </div>
    </div>
  );
}

export default  UserBookDetails;
