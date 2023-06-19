import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {fetchuserDetails} from '../../api';
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);


  const token=localStorage.getItem("token");
  if(token){
    const decodedToken = jwtDecode(token);
    var userId = decodedToken.userId;
    console.log(userId);
  }
 
  // let logged = JSON.parse(hamada);
//   console.log(logged);

  useEffect(() => {
    fetchuserDetails(userId)
    .then((data) => {
      setUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [userId]);

  
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Type:</strong> {user.type}
      </div>
      {user.image && (
        <div>
          <img src={user.image} alt="User" />
        </div>
      )}

<button className='btn btn-outline-info me-2'><NavLink className="link1" to={`/UpdateUser/${user._id}`}> Update</NavLink></button>
    </div>
  );
};

export default UserProfile;
