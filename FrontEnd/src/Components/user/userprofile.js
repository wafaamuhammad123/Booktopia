import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);


  const hamada=localStorage.getItem("user");
   let logged = JSON.parse(hamada);
//   console.log(logged);

  useEffect(() => {
   
    setUser(logged); 

  }, []);

  
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
    </div>
  );
};

export default UserProfile;
