import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate, useNavigate, useParams, NavLink } from "react-router-dom";
import {fetchmyBooks} from "../../api";


export default function UserBooks (){
    const [userBook, setBooks]= useState([]);
    const { id } = useParams();
    console.log("this is user id",id);
    //fetchmyBooks
     useEffect(() => {
        fetchmyBooks(id)
          .then((data) => {
            console.log(data);
            setBooks(data.books);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);


    // return some JSX here
    return (
        <div>
       {userBook.length > 0 && userBook.map((books) => (
        <div key={books._id}>
          {books.book.map((book) => (
          <div key={book._id}>
            <h2>{book.title}</h2>
            <img src={book.imageLink} alt={book.title} />
            <p>Author: {book.author_id}</p>
            <p>Category: {book.category}</p>
            <p>Description: {book.description}</p>
            <p>Language: {book.language}</p>
            <p>Pages: {book.pages}</p>
            <p>Year: {book.year}</p>
            <a href={book.pdfLink}>Download PDF</a>
            <audio controls>
              <source src={book.recordLink} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>Status: {books.statue}</p>
          </div>
        ))}
        </div>
      ))}
        </div>
    );
};



