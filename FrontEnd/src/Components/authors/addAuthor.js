import { useState } from "react";
import Sidebar from "../admin_dashboard/sidebar";
import  Styles from '../books/addBook.module.css'
import axios from 'axios';
import { createAuthor } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddAuthor (){
    const navigate = useNavigate();
    const [newAuthor, setNewAuthor] = useState({
       name: "",
        aboutHim: "",
        imageLink:""
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
      };
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAuthor((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    

      const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            name: newAuthor.name,
            aboutHim: newAuthor.aboutHim,
            imageLink: selectedImage
        };
        console.log(data);
       let res = await axios.post('http://localhost:4000/api/author/create', {data});
       navigate("/authors")
    };

    return (
        <div className='body'>
      <Sidebar/>
      <div style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Add Author</h2>
      <div className={Styles.inputs}>
        <label>
          Name:
          <br/>
          <input
            type="text"
            name="name"
            value={newAuthor.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          About The Author:
          <br />
          <input
            type="textarea"
            name="aboutHim"
            value={newAuthor.aboutHim}
            onChange={handleInputChange}
          />
        </label>
        </div>
     
        <label>
          Image:
          <br />
          <input
            type="file"
            name="imageLink"
            value={newAuthor.imageLink}
            onChange={handleImageChange}
          />
        </label>
    
        <button type="submit" id={Styles.addbk}>Add Book</button>
      </form>
      </div>
    </div>
    )
}