import { useState } from "react";
import Sidebar from "../admin_dashboard/sidebar";
import  Styles from '../books/addBook.module.css'
import { createAuthor } from "../../api";
import { useNavigate } from "react-router-dom";

export default function AddAuthor (){
    const navigate = useNavigate();
    const [newAuthor, setNewAuthor] = useState({
       name: "",
        aboutHim: "",
    });
    const [image, setSelectedImage] = useState(null);

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
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", newAuthor.name);
        formData.append("aboutHim", newAuthor.aboutHim);
        createAuthor(formData)
        .then((data) => {
          console.log("autor added successfully:", data);
          navigate('/authors');
        })
        .catch((error) => {
          console.log(error);
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
            onChange={handleInputChange}
          />
        </label>
        <label>
          About The Author:
          <br />
          <input
            type="textarea"
            name="aboutHim"
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
              placeholder='Enter the author image'
              onChange={handleImageChange}
            />
        </label>
    
        <button type="submit" id={Styles.addbk}>Add Author</button>
      </form>
      </div>
    </div>
    )
}