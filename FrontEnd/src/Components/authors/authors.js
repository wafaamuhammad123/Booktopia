import { useEffect, useState } from "react"
import { deleteAuthor, fetchAuthors } from "../../api";
import Sidebar from "../admin_dashboard/sidebar";
import { NavLink } from "react-router-dom";

export default function Authors (){
    const [authors, setAuthors] =  useState([])

    const handleDeleteAuthor = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this Author?');
      if (confirmDelete) {
        deleteAuthor(id)
          .then((response) => {
            window.location.reload();
            console.log('Author deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting Author:', error);
          });
      }
    };

    useEffect(()=>{
        fetchAuthors()
        .then((data) => {
          setAuthors(data)
         console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])
    return (
        <div className='body'>
        <Sidebar/>
        <div style={{paddingTop: "3%"}}>
         <p className='addBook'><span><NavLink className="link1" to={`/createAuthor`}>Add Author</NavLink></span></p>
        <table  className="cont">
         <thead>
             <tr>
               <th>Author</th>
               <th>Name</th>
               <th>About</th>
               <th>Actions</th>
             </tr>
       </thead>
       <tbody>
        {authors.map(author=>(
             <tr key={author._id}>
             <td>{author.name}</td>
             <td>{author.aboutHim}</td>
             <td>
               <button className='btn btn-outline-success me-2'><NavLink className="link1" to={`/authors/${author._id}`}>View</NavLink></button>
     
               <button className='btn btn-outline-info me-2'><NavLink className="link1" to={`/updateAuthor/${author._id}`}> Update</NavLink></button>
               <button className='btn btn-outline-danger me-2'onClick={() => handleDeleteAuthor(author._id)}>Delete</button>
             </td>
           </tr>
        ))}
       </tbody>
       </table>
       </div>
     </div>
    )
}