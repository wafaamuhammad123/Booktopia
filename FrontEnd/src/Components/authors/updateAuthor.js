import { useEffect, useState } from "react";
import Sidebar from "../admin_dashboard/sidebar";
import  Styles from '../books/addBook.module.css'
import axios from 'axios';
import {fetchAuthor, updateAuthor } from "../../api";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function UpdateAuthor (){
    const [author, setAuthor]= useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
   
    const { id } = useParams();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAuthor((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    
      const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
      };
      const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            name: author.name,
            aboutHim: author.aboutHim,
            imageLink:  selectedImage ? selectedImage.name : ''
        };
        updateAuthor(data,id)
        .then((data) => {
          console.log("Author updated successfully:", data);
          navigate('/authors');
        })
        .catch((error) => {
          console.error("Error updating author:", error);
        });
  
    };


    useEffect(()=>{
        fetchAuthor(id)
        .then((data) => {
          setAuthor(data)
         console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])
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
            value={author.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          About The Author:
          <br />
          <input
            type="textarea"
            name="aboutHim"
            value={author.aboutHim}
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
            onChange={handleImageChange}
          />
        </label>
    
        <button type="submit" id={Styles.addbk}>Update</button>
      </form>
      </div>
    </div>
    )
}

