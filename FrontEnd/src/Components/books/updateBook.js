import React, { useEffect, useState } from "react";
import { updateBook, fetchBookDetails } from "../../api";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAuthors } from "../../api";
import Sidebar from '../admin_dashboard/sidebar';
import Styles from './addBook.module.css';

function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedmp4, setSelectedmp4] = useState(null);
  const [selectedpdf, setSelectedpdf] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [book, setBook] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBookDetails(id)
      .then((data) => {
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthorsData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
      author_id: selectedAuthorId,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handlemp4Change = (e) => {
    setSelectedmp4(e.target.files[0]);
  };

  const handlepdfChange = (e) => {
    setSelectedpdf(e.target.files[0]);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!book.title.trim()) {
      errors.title = 'Title must not be empty';
      valid = false;
    }

    if (!book.year) {
      errors.year = 'Year must not be empty';
      valid = false;
    }

    if (!book.language.trim()) {
      errors.language = 'Language must not be empty';
      valid = false;
    }

    if (!book.pages) {
      errors.pages = 'Pages must not be empty';
      valid = false;
    }

    if (!book.category.trim()) {
      errors.category = 'Category must not be empty';
      valid = false;
    }

    if (!book.description.trim()) {
      errors.description = 'Description must not be empty';
      valid = false;
    }

    if (!selectedAuthorId) {
      errors.author_id = 'Author must not be empty';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("mp4", selectedmp4);
    formData.append("pdf", selectedpdf);
    formData.append("author_id", selectedAuthorId);
    formData.append("title", book.title);
    formData.append("year", book.year);
    formData.append("language", book.language);
    formData.append("pages", book.pages);
    formData.append("category", book.category);
    formData.append("description", book.description);
    formData.append("_id", book._id);

    updateBook(formData)
      .then((data) => {
        console.log("Book updated successfully:", data);
        navigate('/books');
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });

    setSelectedImage(null);
    setSelectedmp4(null);
  };
  return (
    <div className="body">
      <Sidebar />
      <div style={{ paddingTop: "1%" }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
          <h2 style={{ textAlign: "center", color: "#FFCB74" }}>Update Book</h2>
          <div className={Styles.inputs}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </label>
            <label>
              Year:
              <input
                type="number"
                name="year"
                value={book.year}
                onChange={handleInputChange}
              />
              {errors.year && <span className="error">{errors.year}</span>}
            </label>
          </div>
          <div className={Styles.inputs}>
            <label>
              Language:
              <input
                type="text"
                name="language"
                value={book.language}
                onChange={handleInputChange}
              />
              {errors.language && <span className="error">{errors.language}</span>}
            </label>
            <label>
              Pages:
              <input
                type="number"
                name="pages"
                value={book.pages}
                onChange={handleInputChange}
              />
              {errors.pages && <span className="error">{errors.pages}</span>}
            </label>
          </div>
          <div className={Styles.inputs}>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={book.category}
                onChange={handleInputChange}
              />
              {errors.category && <span className="error">{errors.category}</span>}
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={book.description}
                onChange={handleInputChange}
              />
              {errors.description && <span className="error">{errors.description}</span>}
            </label>
          </div>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </label>
          <br />
          <label>
            Video:
            <input
              type="file"
              name="mp4"
              onChange={handlemp4Change}
            />
          </label>
          <br />
          <label>
            PDF:
            <input
              type="file"
              name="pdf"
              onChange={handlepdfChange}
            />
          </label>
          <br />
          <label>
            Author:
            <select
              name="author_id"
              value={selectedAuthorId}
              onChange={(event) => setSelectedAuthorId(event.target.value)}
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.author_id && <span className="error">{errors.author_id}</span>}
          </label>
          <br />
          <button type="submit" id={Styles.addbk}>Update Book</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;