import { useEffect, useState } from "react";
import Sidebar from "../admin_dashboard/sidebar";
import  Styles from '../books/addBook.module.css'
import {fetchAuthor, updateAuthor } from "../../api";
import {  useNavigate, useParams } from "react-router-dom";
import "./authorDetails.css"

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
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Update Author</h2>
      <div  className="newfrm">
        <label className="lbll">
          Name:
          <br/>
          <input
            type="text"
            name="name"
            value={author.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="lbll">
          About The Author:
          <br />
          <textarea className="txtt"
            type="textarea"
            name="aboutHim"
            value={author.aboutHim}
            onChange={handleInputChange}
          />
        </label>
       
     
        <label  className="lbll">
          Image:
          <br />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </label>
    
        <button className="btn2" type="submit" >Update</button>
        </div>
      </form>
      </div>
    </div>
    )
}

