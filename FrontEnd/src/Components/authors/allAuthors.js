import { useEffect, useState } from "react"
import { fetchAuthors } from "../../api";
import {  NavLink } from 'react-router-dom';
import Header from "../header/header";
import Footer from "../footer/footer";
const AllAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [filtered, setFiltered] = useState([]);
  
    useEffect(() => {
      fetchAuthors()
        .then((data) => {
          setAuthors(data);
          setFiltered(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setFiltered(authors.filter((author) => {
        return author.name.toLowerCase().includes(searchTerm.toLowerCase());
      }));
    };
  
    return (
      <div id="latest-blog">
        <Header />
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header align-center">
                
                <h2 class="section-title">Authors</h2>
              </div>

              <div style={{margin: "2rem", textAlign: "center"}}>
                  <label htmlFor="search">Search:</label>
                  <input
                  style={{width: "50%"}}
                    type="text"
                    id="search"
                    onChange={handleSearch}
                  />
                </div>
  
              {filtered.length > 0 && (
                <div class="row">
                  {filtered.map((author) => (
                    <div class="col-md-4">
                      <article class="column" data-aos="fade-up">
                        <figure>
                        <NavLink to={`/authors/${author._id}`}>
                            <img
                              src={author.imageLink}
                              alt="author"
                              class="post-image"
                            />
                          </NavLink>
                        </figure>
                        <div class="post-item">
                          <h3>
                            <a href=".">{author.name}</a>
                          </h3>
  
                          <div class="links-element">
                            <div class="categories">{author.aboutHim}</div>
                            <div class="social-links">
                              <ul>
                                <li>
                                  <a href=".">
                                    <i class="icon icon-facebook"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href=".">
                                    <i class="icon icon-twitter"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href=".">
                                    <i class="icon icon-behance-square"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
  
              {filtered.length === 0 && (
                <div>
                  <h3>No authors found.</h3>
                </div>
              )}
  
           
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default AllAuthors;