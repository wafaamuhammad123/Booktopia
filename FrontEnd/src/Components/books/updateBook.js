import React, {useEffect,useState } from "react";
import { updateBook, fetchBookDetails } from "../../api";
import { useNavigate } from 'react-router-dom';
import { fetchAuthors } from "../../api";
import { useParams } from "react-router-dom";
import Sidebar from '../admin_dashboard/sidebar';
import  Styles from './addBook.module.css'
function UpdateBook() {
  const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedmp4, setSelectedmp4] = useState(null);
    const [selectedpdf, setSelectedpdf] = useState(null);
    const [selectedAuthorId, setSelectedAuthorId] = useState('');
    const [authors, setAuthors] = useState([]);

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
        formData.append("title", book.title);
        formData.append("year", book.year);
        formData.append("language", book.language);
        formData.append("pages", book.pages);
        formData.append("category", book.category);
        formData.append("description", book.description);
        formData.append("_id", book._id);
        console.log("okkkk");
        console.log(formData.get("_id"));
        console.log(formData.get("year"));

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
  }

  return (
    <div className="body">
      <Sidebar/>
      <div  style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Update Book</h2>
      <div className={Styles.inputs}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={book.year}
            onChange={handleInputChange}
          />
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
        </label>
        <label>
          Pages:
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleInputChange}
          />
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
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={book.description}
            onChange={handleInputChange}
          />
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
      </label>
      <br />
        <button type="submit" id={Styles.addbk}>Update Book</button>
      </form>
      </div>
    </div>
  );

 
}

export default UpdateBook;