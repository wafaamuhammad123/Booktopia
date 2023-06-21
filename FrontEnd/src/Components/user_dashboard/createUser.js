import React, {useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchAddUser } from "../../api";
import Sidebar from '../admin_dashboard/sidebar';
import  Styles from '../books/addBook.module.css';
import '../books/update.css';
function AddUser() {
  const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        type:"",
    });
    const [image, setImage] = useState(null);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

  
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("username", newUser.username);
        formData.append("email", newUser.email);
        formData.append("password", newUser.password);
        formData.append("type", "user");
      
        fetchAddUser(formData)
          .then((data) => {
            console.log("User added successfully:", data);
            navigate('/getUsers');
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      };

  return (
    <div className='body'>
      <Sidebar/>
      <div style={{paddingTop: "1%"}}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={Styles.newUser}>
      <h2 style={{textAlign:"center", color:"#FFCB74" }}>Add User</h2>
      <div className={Styles.inputs}>
        <label>
          User Name:
          <br/>
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label>
          Email:
          <br />
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        </div>
        <div  className={Styles.inputs}>
          <label>
          password:
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </label>
        </div>
        <div  className={Styles.inputs}>
        <label>
          Upload Image:
          <br />
          <input
                type="file"
                name="image"
                onChange={handleImageChange}
            />
        </label>
        </div>
      <br />
        <button type="submit" id={Styles.addbk}>Add User</button>
      </form>
      </div>
    </div>
  );
}

export default AddUser;