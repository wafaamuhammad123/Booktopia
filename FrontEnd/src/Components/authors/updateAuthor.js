import { useEffect, useState } from "react";
import Sidebar from "../admin_dashboard/sidebar";
import  Styles from '../books/addBook.module.css'
import {fetchAuthor, updateAuthor } from "../../api";
import {  useNavigate, useParams } from "react-router-dom";

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
    
      const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("name", author.name);
        formData.append("aboutHim", author.aboutHim);
        formData.append("_id", author._id);
     
        updateAuthor(formData)
        .then((data) => {
          console.log("Author updated successfully:", data);
          navigate('/authors');
        })
        .catch((error) => {
          console.error("Error updating author:", error);
        });
  
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
            name="image"
            onChange={handleImageChange}
          />
        </label>
    
        <button type="submit" id={Styles.addbk}>Update</button>
      </form>
      </div>
    </div>
    )
}

