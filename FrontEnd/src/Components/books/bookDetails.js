import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../../api";
import Sidebar from "../admin_dashboard/sidebar";
function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    fetchBookDetails(id)
      .then((data) => {
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="body">
      <Sidebar/>
      <div style={{paddingTop: "1%"}} >
        <form className="details">
          <img src="" alt=""/>
          <p>{book.title}</p>
          <p>{book.year}</p>
          <p>{book.language}</p>
          <p>{book.description}</p>
          <p>{book.pages}</p>
          <p>{book.category}</p>
      </form>
      </div>
    </div>
  );
}

export default BookDetails;
