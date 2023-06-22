import React, {useEffect,useState } from "react";
import { fetchUpdateUser, fetchuserDetails } from "../../api";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Sidebar from '../admin_dashboard/sidebar';
import  Styles from '../books/addBook.module.css';
import "./user.css";
function UpdateUserDetails() {
    const [user, setUser]= useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    
    
    useEffect(() => {
        fetchuserDetails(id)
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
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
            navigate('/getUsers');
          })
          .catch((error) => {
            console.error("Error updating book:", error);
        });
        


        setSelectedImage(null);
  };

  return (
    <div className="body">
      <Sidebar/>
      <div  style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newBook}>
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Update User</h2>
      <div className="newfrm">
      <label className="lbll">
          Email:
          <br/>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="lbll">
          username:
          <br />
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </label>
       
     
        <label className="lbll">
          Image:
          <br />
          <input
            type="file"
            name="image"
            value={user.imageLink}
            onChange={handleImageChange}
          />
        </label>
    
        <button className="btn2" type="submit" >Update</button>
        </div>
      </form>
      </div>
    </div>
  );

 
}

export default UpdateUserDetails;