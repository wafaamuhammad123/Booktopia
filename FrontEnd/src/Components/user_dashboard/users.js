import { useEffect, useState } from "react"
import { fetchDeleteuser, fetchusers } from "../../api";
import Sidebar from "../admin_dashboard/sidebar";
import { NavLink } from "react-router-dom";

export default function Users (){
    const [users, setUser] =  useState([])

    const handleDeleteUser = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        fetchDeleteuser(id)
          .then((response) => {
            window.location.reload();
            console.log('User deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      }
    };

    useEffect(()=>{
        fetchusers()
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
        <Sidebar/>
        <div style={{paddingTop: "3%"}}>
         <p className='addBook'><span><NavLink className="link1" to={`/CreateUser`}>Add User</NavLink></span></p>
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
        {users.map(user=>(
             <tr key={user._id}>
             <td>{user.username}</td>
             <td>{user.email}</td>
             <td>{user.type}</td>
             <td>
               <button className='btn btn-outline-success me-2'><NavLink className="link1" to={`/viewUser/${user._id}`}>View</NavLink></button>
     
               <button className='btn btn-outline-info me-2'><NavLink className="link1" to={`/updateUser/${user._id}`}> Update</NavLink></button>
               <button className='btn btn-outline-danger me-2'onClick={() => handleDeleteUser(user._id)}>Delete</button>
             </td>
           </tr>
        ))}
       </tbody>
       </table>
       </div>
     </div>
    )
}