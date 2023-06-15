import React, {useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchAddBook } from "../../api";
import { fetchAuthors } from "../../api";
import Sidebar from '../admin_dashboard/sidebar';
import  Styles from './addBook.module.css'
function AddBook() {
  const navigate = useNavigate();
    const [newBook, setNewBook] = useState({
        title: "",
        year: "",
        language: "",
        pages:"",
        category: "",
        description: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedmp4, setSelectedmp4] = useState(null);
    const [selectedpdf, setSelectedpdf] = useState(null);
    const [selectedAuthorId, setSelectedAuthorId] = useState('');
    const [authors, setAuthors] = useState([]);




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
        
        
    
      const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("mp4", selectedmp4);
        formData.append("pdf", selectedpdf);
        formData.append("author_id", selectedAuthorId);
        formData.append("title", newBook.title);
        formData.append("year", newBook.year);
        formData.append("language", newBook.language);
        formData.append("pages", newBook.pages);
        formData.append("category", newBook.category);
        formData.append("description", newBook.description);
        fetchAddBook(formData)
          .then((data) => {
            console.log("Book added successfully:", data);
            navigate('/books');
          })
          .catch((error) => {
            console.error("Error adding book:", error);
        });
          setNewBook({
            title: "",
            year: "",
            language: "",
            pages:"",
            category: "",
            description: "",
        });
        setSelectedImage(null);
        setSelectedmp4(null);
  }

  return (
    <div className='body'>
      <Sidebar/>
      <div style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Add Book</h2>
      <div className={Styles.inputs}>
        <label>
          Title:
          <br/>
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
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
        </label>
        </div>
        <div  className={Styles.inputs}>
          <label>
          Language:
          <br />
          <input
            type="text"
            name="language"
            value={newBook.language}
            onChange={handleInputChange}
          />
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
        </label>
        </div>
        <div  className={Styles.inputs}>
        <label>
          Category:
          <br />
          <input
            type="text"
            name="category"
            value={newBook.category}
            onChange={handleInputChange}
          />
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
        </label>
        </div>
        <label>
          Image:
          <br />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </label>
        <br />
        <label>
        Video:
        <br />
        <input
          type="file"
          name="mp4"
          onChange={handlemp4Change}
        />
      </label>
      <br />
      <label>
        PDF:
        <br/>
        <input
          type="file"
          name="pdf"
          onChange={handlepdfChange}
        />
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
      </label>
      <br />
        <button type="submit" id={Styles.addbk}>Add Book</button>
      </form>
      </div>
    </div>
  );
}

export default AddBook;