import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchuserDetails } from "../../api";
import Sidebar from "../admin_dashboard/sidebar";
import '../books/details.css'
function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchuserDetails(id)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="body">
      <Sidebar/>
      <div style={{paddingTop: "3%"}} >
        <form className="details">
          <img src="" alt=""/>
          <p><span className="book">UserName: </span>{user.username}</p>
          <p><span className="book">Email: </span>{user.email}</p>
          <p><span className="book">Type: </span>{user.type}</p>
          <img src={user.image} alt="notFound"/>
          <div>
          <div>
    </div>
    </div>  
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
