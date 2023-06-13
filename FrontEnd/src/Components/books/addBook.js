import React, {useState } from "react";
import { fetchAddBook } from "../../api";

function AddBook() {
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



    const handleInputChange = (e) => {
        setNewBook({
          ...newBook,
          [e.target.name]: e.target.value,
        });
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
        
        
    
      const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("mp4", selectedmp4);
        formData.append("pdf", selectedpdf);
        formData.append("title", newBook.title);
        formData.append("year", newBook.year);
        formData.append("language", newBook.language);
        formData.append("pages", newBook.pages);
        formData.append("category", newBook.category);
        formData.append("description", newBook.description);
        fetchAddBook(formData)
          .then((data) => {
            console.log("Book added successfully:", data);
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
            description: ""
        });
        setSelectedImage(null);
        setSelectedmp4(null);
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={newBook.year}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={newBook.language}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Pages:
          <input
            type="number"
            name="pages"
            value={newBook.pages}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newBook.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newBook.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
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
        <button type="submit">Add Book</button>
      </form>
    </div>
  );

 
}

export default AddBook;