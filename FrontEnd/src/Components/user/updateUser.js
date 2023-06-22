import React, { useEffect, useState } from 'react';
import  Styles from '../books/addBook.module.css';
import {fetchUpdateUser,fetchuserDetails} from '../../api';
import { useNavigate, useParams } from "react-router-dom";

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
        <div className='body'>
      <div style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
      <div className={Styles.inputs}>
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
        </div>
     
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
    
        <button type="submit" id={Styles.addbk}>submit</button>
      </form>
      </div>
    </div>
    )
}