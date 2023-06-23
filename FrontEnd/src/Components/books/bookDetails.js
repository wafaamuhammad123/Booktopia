import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../../api";
import Sidebar from "../admin_dashboard/sidebar";
import './details.css'

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [pdfLink, setPdfLink] = useState("");

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

  return (
    <div className="body">
      <Sidebar />
      <div style={{ paddingTop: "3%" }}>
        <form className="details">
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
        </form>
      </div>
    </div>
  );
}

export default BookDetails;
