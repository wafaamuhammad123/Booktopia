import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {fetchuserDetails} from '../../api';
import './userprofile.css';
import Header from '../header/header';
import Footer from '../footer/footer.js';


const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);


  const token=localStorage.getItem("token");
  if(token){
    const decodedToken = jwtDecode(token);
     userId = decodedToken.userId;
    console.log(userId);
  }

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
    <div className="page">
      <Header />
    <div className="body-div center-divs">
      <div className="card mb-3" id='mycard' style={{width: "70%"}}>
        <div className="profile-img">

          <label for="image-upload">
            {user.image && (
            <img
              id="image-preview" style={{width: "300px", height: "280px", borderRadius:"15%",}}
              src={user.image}
              alt="upload image"
            />)}
          </label>

          <span className="sell-text">{user.username}</span>

          <hr className="hr-center" />

          <p className="fonts">
            This is your personal space where you can manage and customize your
            profile information. From here, you can update your profile picture,
            edit your information, and edit your orders list. Take control of
            your online presence and make your profile reflect who you are.
          </p>
        </div>

        <h1 className="d-flex justify-content-center h-media">Your Information</h1>
        <hr style={{width: "34%", marginLeft: "33%"}} /><br/>

        <div className="row" style={{width: "80%", marginLeft: "10%", textAlign: "center"}}>
          <div className="col-md-6">
            <label className="labels label-media">Type:</label>
            <span className="fonts" style={{marginLeft: "2%"}}>
            {user.type}
            </span>
          </div>
          <div className="col-md-6">
            <label className="labels label-media">Email:</label>
            <span className="fonts" style={{marginLeft: "2%"}}>
            {user.email}
            </span>
          </div>
        </div>

        <br/><br/>

        <h1 className="d-flex justify-content-center h-media">More Details</h1>
        <hr style={{width: "34%", marginLeft: "33%"}} /><br/>

        <div className="row" style={{width: "90%", marginLeft: "5%", textAlign: "center"}}>
          <div className="col">
            <button className="btn btn-outline-accent btn-accent-arrow" type="button" style={{width:"50%"}}><NavLink className="link1" to={`/UpdateUser/${user._id}`}>Update Profile</NavLink></button>
          </div>

          <div className="col">
            <button className="btn btn-outline-accent btn-accent-arrow" type="button" style={{width:"50%"}}><NavLink className="link1" to={`/UserBooks/${user._id}`}>My Book Lists</NavLink></button>
          </div>

        </div>
      </div>
    </div>
    <Footer />
</div>
  );
};

export default UserProfile;