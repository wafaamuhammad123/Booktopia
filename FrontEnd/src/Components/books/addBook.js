import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAddBook } from '../../api';
import { fetchAuthors } from '../../api';
import Sidebar from '../admin_dashboard/sidebar';
import Styles from './addBook.module.css';
import './update.css';

function AddBook() {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    title: '',
    year: '',
    language: '',
    pages: '',
    category: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedmp4, setSelectedmp4] = useState(null);
  const [selectedpdf, setSelectedpdf] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevState) => ({
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

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!newBook.title.trim()) {
      errors.title = 'Title is required';
      valid = false;
    }

    if (!newBook.year.trim()) {
      errors.year = 'Year is required';
      valid = false;
    } else if (isNaN(newBook.year) || newBook.year.length !== 4) {
      errors.year = 'Invalid year format';
      valid = false;
    }

    if (!newBook.language.trim()) {
      errors.language = 'Language is required';
      valid = false;
    }

    if (!newBook.pages.trim()) {
      errors.pages = 'Pages is required';
      valid = false;
    } else if (isNaN(newBook.pages) || newBook.pages <= 0) {
      errors.pages = 'Invalid number of pages';
      valid = false;
    }

    if (!newBook.category.trim()) {
      errors.category = 'Category is required';
      valid = false;
    }

    if (!newBook.description.trim()) {
      errors.description = 'Description is required';
      valid = false;
    }

    if (!selectedImage) {
      errors.image = 'Image is required';
      valid = false;
    } else if (!selectedImage.type.startsWith('image/')) {
      errors.image = 'Invalid image file type';
      valid = false;
    }

    if (!selectedmp4) {
      errors.mp4 = 'Video is required';
      valid = false;
    } else if (selectedmp4.type !== 'video/mp4') {
      errors.mp4 = 'Invalid video file type';
      valid = false;
    }

    if (!selectedpdf) {
      errors.pdf = 'PDF is required';
      valid = false;
    } else if (selectedpdf.type !== 'application/pdf') {
      errors.pdf = 'Invalid PDF file type';
      valid = false;
    }

    if (!selectedAuthorId) {
      errors.author_id = 'Author is required';
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
    formData.append('image', selectedImage);
    formData.append('mp4', selectedmp4);
    formData.append('pdf', selectedpdf);
    formData.append('author_id', selectedAuthorId);
    formData.append('title', newBook.title);
    formData.append('year', newBook.year);
    formData.append('language', newBook.language);
    formData.append('pages', newBook.pages);
    formData.append('category', newBook.category);
    formData.append('description', newBook.description);

    fetchAddBook(formData)
      .then((data) => {
        console.log('Book added successfully:', data);
        navigate('/books');
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });

    setNewBook({
      title: '',
      year: '',
      language: '',
      pages: '',
      category: '',
      description: '',
    });
    setSelectedImage(null);
    setSelectedmp4(null);
    setSelectedpdf(null);
  };

  return (
    <div className="body">
      <Sidebar />
      <div style={{ paddingTop: '1%' }}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className={Styles.newBook}
        >
          <h2 style={{ textAlign: 'center', color: '#FFCB74' }}>Add Book</h2>
          <div className={Styles.inputs}>
            <label>
              Title:
              <br />
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </label>
            <label>
              Year:
              <br />
              <input
                type="number"
                name="year"
                value={newBook.year}
                onChange={handleInputChange}
              />
              {errors.year && <span className="error">{errors.year}</span>}
            </label>
          </div>
          <div className={Styles.inputs}>
            <label>
              Language:
              <br />
              <input
                type="text"
                name="language"
                value={newBook.language}
                onChange={handleInputChange}
              />
              {errors.language && (
                <span className="error">{errors.language}</span>
              )}
            </label>
            <label>
              Pages:
              <br />
              <input
                type="number"
                name="pages"
                value={newBook.pages}
                onChange={handleInputChange}
              />
              {errors.pages && <span className="error">{errors.pages}</span>}
            </label>
          </div>
          <div className={Styles.inputs}>
            <label>
              Category:
              <br />
              <input
                type="text"
                name="category"
                value={newBook.category}
                onChange={handleInputChange}
              />
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </label>
            <label>
              Description:
              <br />
              <input
                type="text"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </label>
          </div>
          <label>
            Image:
            <br />
            <input type="file" name="image" onChange={handleImageChange} />
            {errors.image && <span className="error">{errors.image}</span>}
          </label>
          <br />
          <label>
            Video:
            <br />
            <input type="file" name="mp4" onChange={handlemp4Change} />
            {errors.mp4 && <span className="error">{errors.mp4}</span>}
          </label>
          <br />
          <label>
            PDF:
            <br />
            <input type="file" name="pdf" onChange={handlepdfChange} />
            {errors.pdf && <span className="error">{errors.pdf}</span>}
          </label>
          <br />
          <label>
            Author:
            <br />
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
            {errors.author_id && (
              <span className="error">{errors.author_id}</span>
            )}
          </label>
          <br />
          <button type="submit" id={Styles.addbk}>
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
