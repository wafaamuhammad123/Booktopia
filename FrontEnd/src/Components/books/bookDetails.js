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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfLink;
    link.download = pdfLink.split("/").pop();
    link.click();
  };

  return (
    <div className="body">
      <Sidebar />
      <div style={{ paddingTop: "3%" }}>
        <form className="details">
          <img src="" alt="" />
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
          <div>
            <video controls>
              <source src={book.recordLink} type="video/mp4" />
            </video>
          </div>
          <img src={book.imageLink} alt="notFound" />
          <div>
          <div>
      <a href={book.pdfLink} target="_blank" rel="noopener noreferrer">
        Read Online
      </a>
    </div>
    </div>  
        </form>
      </div>
    </div>
  );
}

export default BookDetails;
