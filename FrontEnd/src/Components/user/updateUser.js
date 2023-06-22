import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {fetchUpdateUser,fetchuserDetails} from '../../api';
import axios from 'axios';
import './update.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/footer.js';
import { NavLink } from "react-router-dom";

export default function UpdateUserProfile (){

    const [user, setUser]= useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      useEffect(() => {
        fetchuserDetails(id)
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);


      const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        console.log(selectedImage);
      };  
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("email", user.email);
        formData.append("username", user.username);
        formData.append("_id", user._id);
        console.log("okkkk");
        console.log(formData.get("_id"));

        fetchUpdateUser(formData)
          .then((data) => {
            console.log("user updated successfully:", data);
            navigate('/userprofile');
          })
          .catch((error) => {
            console.error("Error updating book:", error);
        });
        


        setSelectedImage(null);
  };
    return (
        <div >
           <Header />
      <div >
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className='lbl'>
        <label>
          Email:
          <br/>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          username:
          <br />
          <input 
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </label>
      
     
        <label>
          Image:
          <br />
          <input 
            type="file"
            name="image"
            value={user.imageLink}
            onChange={handleImageChange}
          />
        </label>
    
        <button className="btnnn" type="submit" >submit</button>
        </div>
      </form>
      </div>
      <Footer />
    </div>
    )
}