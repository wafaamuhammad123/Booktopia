import { useEffect, useState } from "react";
import "./authorDetails.css";
import { fetchAuthor, fetchBooksByAuthor } from "../../api";
import { useParams } from "react-router-dom";

export default function Author (){
    const [author, setAuthor]= useState({});
    const [books, setBooks] = useState([])
    const { id } = useParams();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg0Y2RiNDJhMWRlNmEwODkyZTljMmYiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNjg3MTcxODI0fQ.nY9c1L4x-YxDRJ4X9eXp7ADi5SsTlWy2OPTn4LaAdCA"

  
    useEffect(()=>{
        fetchAuthor(id, token)
        .then((data) => {
          setAuthor(data)
         console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

        fetchBooksByAuthor(id, token)
        .then((data) => {
        setBooks(data)
         console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])

    return (
      <div>
        <section className="bg-sand padding-large">
          <div className="container">
           {author && <div className="row">
              <div className="col-md-6">
                <a href="#" className="product-image">
                  <img
                    style={{ height: "550px" }}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                  />
                </a>
              </div>

              <div className="col-md-6 pl-5">
                <div className="product-detail">
                  <h1>{author.name}</h1>
                  <p>Fiction</p>

                  <p>
                   {author.aboutHim}
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>}
          </div>

          <div id="featured-books">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-header align-center">
                    <div className="title">
                      <span>Some quality items</span>
                    </div>
                    <h2 className="section-title">Books By {author.name}</h2>
                  </div>

                  <div className="product-list" data-aos="fade-up">
                    <div className="row">
                  
                      {books &&  books.map(book=>(
                            <div className="col-md-6">
                            <figure className="product-style">
                              <img
                              src={book.imgLink}
                                alt="Books"
                                className="product-item"
                              />
                              <button
                                type="button"
                                className="add-to-cart"
                                data-product-tile="add-to-cart"
                              >
                                Add to Favorites
                              </button>
                              <figcaption>
                                <h3>{book.title}</h3>
                                <p>{book.description}</p>
                                <div className="item-price">Year: {book.year}</div>
                              </figcaption>
                            </figure>
                          </div>
                          
                          
                      )) }
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
}