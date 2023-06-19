import React, { useEffect, useState } from 'react';
import  Styles from '../books/addBook.module.css';
import axiosInstance from '../utils/axiosInstance';
import {fetchUpdateUser} from '../../api';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from "react-router-dom";

//const axiosInst = require("../utils/axiosInstance");
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

    
      const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        console.log(selectedImage);
      };  


      const handleSubmit = async(e) => {
        e.preventDefault();
        let data = {
            email: user.email,
            username: user.username,
            image: selectedImage
        };
        console.log(data);
        let res = await axiosInstance.put(`user/user/${user._id}`, {data});
        navigate("/userprofile")
    };


    useEffect(()=>{
        fetchUpdateUser(id)
        .then((data) => {
          setUser(data)
         console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])
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



































// const UpdateUserProfile = ({ userId }) => {
//     const [user, setUser] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [updatedUsername, setUpdatedUsername] = useState('');
//     const [updatedEmail, setUpdatedEmail] = useState('');
//     const [updatedType, setUpdatedType] = useState('');

//     const hamada=localStorage.getItem("user");
//     let logged = JSON.parse(hamada);
//     return (
//     <div>
//         <strong>Type:</strong>
//         {isEditing ? (
//           <input
//             type="text"
//             value={updatedType}
//             onChange={(e) => setUpdatedType(e.target.value)}
//           />
//         ) : (
//           user.type
//         )}
//       </div>
//       {user.image && (
//         <div>
//           <img src={user.image} alt="User" />
//         </div>
//       )}
//       {!isEditing && (
//         <button className="update" onClick={() => setIsEditing(true)}>
//           Update Data
//         </button>
//       )}
//       {isEditing && (
//         <button className="save" onClick={handleUpdateData}>
//           Save Changes
//         </button>
//       )}
//     </div>
//     );
// };
// export default UpdateUserProfile;